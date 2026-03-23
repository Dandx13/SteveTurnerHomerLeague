// Updated Fantasy Teams and Players
// Fantasy teams are loaded from JSON so rosters can be updated without editing this file
let fantasyTeams = [];
let fantasyTeamsLoadPromise = null;

async function loadFantasyTeams() {
  if (fantasyTeamsLoadPromise) return fantasyTeamsLoadPromise;

  fantasyTeamsLoadPromise = (async () => {
    const response = await fetch("data/fantasy-rosters-2026.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load rosters: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.teams)) {
      throw new Error("Roster JSON must contain a teams array.");
    }

    fantasyTeams = data.teams;
    return fantasyTeams;
  })();

  return fantasyTeamsLoadPromise;
}


// Object to store season home run data (2024) by player
let playerHomeRuns = {};

// Object to store monthly home run data (season 2024) by player
let playerMonthlyStats = {};

// =========================
// Season & Team Stats caches
// =========================
const CURRENT_SEASON = 2026;
const playerSeasonStats = {};
let hrEventDataByPlayer = {};
let hrEventDataLoadPromise = null;
const IL_CACHE_KEY = "dl_il_status_cache_v2";
const IL_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
let playerILByPlayerId = new Map();
let lineupKnownByTeamId = new Map();
let currentLineupByPlayerId = new Map();
let appearedTodayByPlayerId = new Map();
let teamGamePkByTeamId = new Map();

// --- NEW: game status + caching (optimized) ---
const TEAM_CACHE_KEY = "dl_playerTeamCache_v2";
const TEAM_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const TEAM_FETCH_CONCURRENCY = 10;

// Map playerId -> teamId
let playerTeamIdByPlayerId = new Map();

// Map teamId -> "live" | "final" | "today" | "off"
let todaysTeamStatusByTeamId = new Map();

// Team season games played cache for HR pace
let teamGamesPlayedByTeamId = new Map();
let teamGamesPlayedLoadPromise = null;

// NEW: gamePks we consider "today" (sports-day), and HR counts in those games
let todaysGamePks = new Set();          // gamePk set for S/R games in our schedule fetch
let playerHRTodayCount = new Map();     // batterId -> HR count across todaysGamePks

function loadILCacheFromStorage() {
  const raw = localStorage.getItem(IL_CACHE_KEY);
  const parsed = safeJsonParse(raw);
  if (!parsed || !parsed.ts || !parsed.map) return null;
  if ((Date.now() - parsed.ts) > IL_CACHE_TTL_MS) return null;
  return parsed.map;
}
function saveILCacheToStorage(mapObj) {
  localStorage.setItem(IL_CACHE_KEY, JSON.stringify({ ts: Date.now(), map: mapObj }));
}
function txDateValue(t) {
  return new Date(t?.date || t?.effectiveDate || t?.resolutionDate || 0).getTime() || 0;
}
function evaluateTransactionsForIL(transactions) {
  const tx = Array.isArray(transactions) ? [...transactions] : [];
  tx.sort((a,b) => txDateValue(b) - txDateValue(a));

  for (const t of tx) {
    const txTime = txDateValue(t);
    if (!txTime) continue;

    const txYear = new Date(txTime).getFullYear();
    if (txYear !== CURRENT_SEASON) continue;

    const desc = (t?.description || '').toLowerCase();
    const typeDesc = (t?.typeDesc || '').toLowerCase();

    const activated =
      desc.includes('activated from injured list') ||
      desc.includes('returned from injured list') ||
      desc.includes('reinstated from injured list') ||
      typeDesc.includes('activated');

    if (activated) return false;

    const placedIL =
      (desc.includes('placed on') && desc.includes('injured list')) ||
      desc.includes('transferred to the 60-day injured list') ||
      desc.includes('10-day injured list') ||
      desc.includes('15-day injured list') ||
      desc.includes('60-day injured list');

    if (placedIL) return true;
  }

  return false;
}
async function fetchPlayerILStatus(playerId) {
  try {
    const resp = await fetch(`https://statsapi.mlb.com/api/v1/transactions?playerId=${playerId}`);
    if (!resp.ok) return false;
    const data = await resp.json();
    return evaluateTransactionsForIL(data?.transactions || []);
  } catch (e) {
    console.warn('IL fetch failed for', playerId, e);
    return false;
  }
}
async function ensurePlayerILStatusesLoaded() {
  const ids = getAllUniquePlayerIds();
  const cached = loadILCacheFromStorage() || {};
  playerILByPlayerId = new Map();
  ids.forEach(pid => {
    if (Object.prototype.hasOwnProperty.call(cached, String(pid))) {
      playerILByPlayerId.set(pid, !!cached[String(pid)]);
    }
  });
  const missing = ids.filter(pid => !playerILByPlayerId.has(pid));
  if (missing.length) {
    await asyncPool(TEAM_FETCH_CONCURRENCY, missing, async (pid) => {
      const isIL = await fetchPlayerILStatus(pid);
      playerILByPlayerId.set(pid, !!isIL);
      cached[String(pid)] = !!isIL;
    });
    saveILCacheToStorage(cached);
  }
}
function hasAnyPositiveStat(obj) {
  if (!obj || typeof obj !== 'object') return false;
  return Object.values(obj).some(v => {
    const n = Number(v);
    return Number.isFinite(n) && n > 0;
  });
}
function getPlayerDisplayState(playerId) {
  if (playerILByPlayerId.get(playerId)) {
    return { key: 'il', html: '<span class="player-status-il" title="On Injured List" aria-label="On Injured List">IL</span>' };
  }
  const teamId = playerTeamIdByPlayerId.get(playerId);
  if (!teamId) {
    return { key: 'sleep', html: '<span class="player-status-wrap" title="No game today" aria-label="No game today"><span class="player-status-sleep">💤</span></span>' };
  }
  const status = todaysTeamStatusByTeamId.get(teamId) || 'off';
  const lineupKnown = !!lineupKnownByTeamId.get(teamId);
  const inCurrentLineup = !!currentLineupByPlayerId.get(playerId);
  const appeared = !!appearedTodayByPlayerId.get(playerId);
  if (status === 'off') {
    return { key: 'sleep', html: '<span class="player-status-wrap" title="No game today" aria-label="No game today"><span class="player-status-sleep">💤</span></span>' };
  }
  if (status === 'today') {
    if (!lineupKnown || inCurrentLineup) {
      return { key: 'ball', html: '<span class="player-status-wrap" title="Starting / waiting on lineup" aria-label="Starting / waiting on lineup"><span class="player-status-ball">⚾</span></span>' };
    }
    return { key: 'sleep', html: '<span class="player-status-wrap" title="Not in today\'s starting lineup" aria-label="Not in today\'s starting lineup"><span class="player-status-sleep">💤</span></span>' };
  }
  if (status === 'live') {
    if (inCurrentLineup) {
      return { key: 'live', html: '<span class="player-status-wrap" title="Currently in the game" aria-label="Currently in the game"><span class="player-status-dot live"></span></span>' };
    }
    if (appeared) {
      return { key: 'out', html: '<span class="player-status-wrap" title="Played today, now out of the game" aria-label="Played today, now out of the game"><span class="player-status-dot out"></span></span>' };
    }
    return { key: 'sleep', html: '<span class="player-status-wrap" title="Bench / has not appeared" aria-label="Bench / has not appeared"><span class="player-status-sleep">💤</span></span>' };
  }
  if (status === 'final') {
    if (appeared) {
      return { key: 'out', html: '<span class="player-status-wrap" title="Played today" aria-label="Played today"><span class="player-status-dot out"></span></span>' };
    }
    return { key: 'sleep', html: '<span class="player-status-wrap" title="Did not play today" aria-label="Did not play today"><span class="player-status-sleep">💤</span></span>' };
  }
  return { key: 'sleep', html: '<span class="player-status-wrap" title="No game today" aria-label="No game today"><span class="player-status-sleep">💤</span></span>' };
}

function getTodayDateStrLocal() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
function getSportsDateET(cutoffHourET = 3) {
  // Current moment, interpreted in America/New_York
  const etNow = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));

  // Before cutoff? Use yesterday's date
  if (etNow.getHours() < cutoffHourET) {
    etNow.setDate(etNow.getDate() - 1);
  }

  // Return YYYY-MM-DD
  const yyyy = etNow.getFullYear();
  const mm = String(etNow.getMonth() + 1).padStart(2, "0");
  const dd = String(etNow.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
function safeJsonParse(str) {
  try { return JSON.parse(str); } catch { return null; }
}

function loadTeamCacheFromStorage() {
  const raw = localStorage.getItem(TEAM_CACHE_KEY);
  const parsed = safeJsonParse(raw);
  if (!parsed || !parsed.ts || !parsed.map) return null;
  if ((Date.now() - parsed.ts) > TEAM_CACHE_TTL_MS) return null;
  return parsed.map;
}

function saveTeamCacheToStorage(mapObj) {
  localStorage.setItem(TEAM_CACHE_KEY, JSON.stringify({
    ts: Date.now(),
    map: mapObj
  }));
}

function getAllUniquePlayerIds() {
  const ids = new Set();
  fantasyTeams.forEach(t => t.players.forEach(p => ids.add(p.id)));
  return Array.from(ids);
}

async function fetchPlayerCurrentTeamId(playerId) {
  // hydrate=currentTeam returns currentTeam.id
  const url = `https://statsapi.mlb.com/api/v1/people/${playerId}?hydrate=currentTeam`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`people/${playerId} failed: ${resp.status}`);
  const data = await resp.json();
  return data?.people?.[0]?.currentTeam?.id ?? null;
}

async function asyncPool(limit, items, iteratorFn) {
  const ret = [];
  const executing = [];
  for (const item of items) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);
    if (limit <= items.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= limit) await Promise.race(executing);
    }
  }
  return Promise.all(ret);
}

async function ensurePlayerTeamIdsLoaded() {
  // 1) Try cached map from localStorage
  const cached = loadTeamCacheFromStorage();
  const ids = getAllUniquePlayerIds();

  const mapObj = cached || {};
  // Fill from cache first
  playerTeamIdByPlayerId = new Map();
  ids.forEach(pid => {
    const teamId = mapObj[String(pid)];
    if (teamId) playerTeamIdByPlayerId.set(pid, teamId);
  });

  // 2) Fetch missing
  const missing = ids.filter(pid => !playerTeamIdByPlayerId.has(pid));
  if (missing.length === 0) return;

  await asyncPool(TEAM_FETCH_CONCURRENCY, missing, async (pid) => {
    try {
      const teamId = await fetchPlayerCurrentTeamId(pid);
      if (teamId) {
        playerTeamIdByPlayerId.set(pid, teamId);
        mapObj[String(pid)] = teamId;
      }
    } catch (e) {
      console.warn("TeamId fetch failed for", pid, e);
    }
  });

  // 3) Save cache back
  saveTeamCacheToStorage(mapObj);
}

function normalizeGameStatus(game) {
  const abstract = game?.status?.abstractGameState; // "Preview" | "Live" | "Final"
  const detailed = (game?.status?.detailedState || "").toLowerCase();

  // Final-ish states
  if (
    abstract === "Final" ||
    detailed.includes("final") ||
    detailed.includes("game over") ||
    detailed.includes("completed early")
  ) return "final";

  // Live-ish states
  if (
    abstract === "Live" ||
    detailed.includes("in progress") ||
    detailed.includes("warmup") ||
    detailed.includes("manager challenge") ||
    detailed.includes("delayed") ||
    detailed.includes("suspended")
  ) return "live";

  // Otherwise if on schedule today, it's "today"
  if (abstract === "Preview" || detailed.includes("scheduled") || detailed.includes("pregame")) return "today";

  // Fallback
  return "today";
}

async function fetchTodaysTeamStatuses() {
  todaysTeamStatusByTeamId = new Map();
  todaysGamePks = new Set();
  teamGamePkByTeamId = new Map();

  const sportsDateET = getSportsDateET(3);
  const url = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${sportsDateET}&gameTypes=S,R`;
  const rank = (s) => (s === "live" ? 3 : s === "final" ? 2 : s === "today" ? 1 : 0);

  try {
    const resp = await fetch(url);
    if (!resp.ok) return;
    const data = await resp.json();
    const games = (data?.dates?.[0]?.games) || [];
    for (const g of games) {
      if (g.gameType !== "R" && g.gameType !== "S") continue;
      if (g?.gamePk) todaysGamePks.add(g.gamePk);
      const awayId = g?.teams?.away?.team?.id;
      const homeId = g?.teams?.home?.team?.id;
      const status = normalizeGameStatus(g);
      const upsert = (teamId) => {
        if (!teamId) return;
        const prev = todaysTeamStatusByTeamId.get(teamId);
        if (!prev || rank(status) > rank(prev)) {
          todaysTeamStatusByTeamId.set(teamId, status);
          if (g?.gamePk) teamGamePkByTeamId.set(teamId, g.gamePk);
        }
      };
      upsert(awayId);
      upsert(homeId);
    }
  } catch (e) {
    console.warn("Schedule fetch failed:", url, e);
  }
}

async function fetchTodaysParticipationData() {
  lineupKnownByTeamId = new Map();
  currentLineupByPlayerId = new Map();
  appearedTodayByPlayerId = new Map();

  const gamePks = Array.from(todaysGamePks);
  if (!gamePks.length) return;

  await asyncPool(6, gamePks, async (gamePk) => {
    try {
      const resp = await fetch(`https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live`);
      if (!resp.ok) return;
      const data = await resp.json();
      const processSide = (side, teamId) => {
        if (!side || !teamId) return;
        const battingOrder = Array.isArray(side.battingOrder) ? side.battingOrder : [];
        if (battingOrder.length > 0) lineupKnownByTeamId.set(teamId, true);
        battingOrder.forEach(pid => currentLineupByPlayerId.set(Number(pid), true));
        const players = side.players || {};
        Object.values(players).forEach(p => {
          const pid = p?.person?.id;
          if (!pid) return;
          const batting = p?.stats?.batting || {};
          const fielding = p?.stats?.fielding || {};
          if (hasAnyPositiveStat(batting) || hasAnyPositiveStat(fielding)) {
            appearedTodayByPlayerId.set(Number(pid), true);
          }
        });
      };
      processSide(data?.liveData?.boxscore?.teams?.away, data?.gameData?.teams?.away?.id);
      processSide(data?.liveData?.boxscore?.teams?.home, data?.gameData?.teams?.home?.id);
    } catch (e) {
      console.warn('Participation fetch failed for gamePk', gamePk, e);
    }
  });
}

function getPlayerGameStatus(playerId) {
  const teamId = playerTeamIdByPlayerId.get(playerId);
  if (!teamId) return "off";
  return todaysTeamStatusByTeamId.get(teamId) || "off";
}

// NEW: fetch HR counts for all today's games (S/R only) and map batterId -> HR count
async function fetchTodaysHomeRunCounts() {
  playerHRTodayCount = new Map();

  const gamePks = Array.from(todaysGamePks);
  if (gamePks.length === 0) return;

  // Limit concurrency so we don’t hammer the API
  const CONCURRENCY = 6;

  await asyncPool(CONCURRENCY, gamePks, async (gamePk) => {
    try {
      const url = `https://statsapi.mlb.com/api/v1/game/${gamePk}/playByPlay?events=home_run`;
      const resp = await fetch(url);
      if (!resp.ok) return;

      const data = await resp.json();
      const plays = data?.allPlays || [];

      for (const p of plays) {
        if (p?.result?.eventType !== "home_run") continue;
        const batterId = p?.matchup?.batter?.id;
        if (!batterId) continue;

        const prev = playerHRTodayCount.get(batterId) || 0;
        playerHRTodayCount.set(batterId, prev + 1);
      }
    } catch (e) {
      console.warn("HR playByPlay failed for gamePk", gamePk, e);
    }
  });
}

function formatHRTodayBadge(count) {
  if (!count || count <= 0) return "";
  const mult = count >= 2 ? `<span class="hr-firework-mult">${count}×</span>` : "";
  return `<span class="hr-firework-badge" title="${count} HR today" aria-label="${count} HR today"><span class="hr-firework-emoji">🚀</span>${mult}</span>`;
}

// --- Season Totals Functions (Homepage) ---
const playerIdLookup = {
  "Fernando Tatis Jr.": 665487,
  "Julio Rodríguez": 677594,
  "Ronald Acuña Jr.": 660670,
  "Trea Turner": 607208,
  "Jesús Sánchez": 660821,
  "Carlos Santana": 467793,
  "Anthony Santander": 623993,
  "Tyler O'Neill": 641933,
  "Cody Bellinger": 641355,
  "Seiya Suzuki": 673548,
  "Andrew Vaughn": 683734,
  "Yandy Díaz": 650490,
  "Kyle Tucker": 663656,
  "Mark Vientos": 668901,
  "Isaac Paredes": 670623,
  "Marcus Semien": 543760,
  "Daulton Varsho": 662139,
  "Jasson Domínguez": 691176,
  "Shohei Ohtani": 660271,
  "Paul Goldschmidt": 502671,
  "Riley Greene": 682985,
  "Taylor Ward": 621493,
  "Josh Jung": 673962,
  "Jeremy Peña": 665161,
  "Cal Raleigh": 663728,
  "Corey Seager": 608369,
  "Jordan Westburg": 676059,
  "Matt Wallner": 670242,
  "Carlos Correa": 621043,
  "MJ Melendez": 669004,
  "Matt Olson": 621566,
  "Michael Toglia": 669911,
  "Jazz Chisholm Jr.": 665862,
  "Christian Yelich": 592885,
  "Nolan Arenado": 571448,
  "Jeimer Candelario": 600869,
  "Yordan Alvarez": 670541,
  "Oneil Cruz": 665833,
  "Vinnie Pasquantino": 686469,
  "William Contreras": 661388,
  "Tyler Soderstrom": 691016,
  "Pete Crow-Armstrong": 691718,
  "Aaron Judge": 592450,
  "Royce Lewis": 668904,
  "Shea Langeliers": 669127,
  "Nolan Gorman": 669357,
  "Ryan McMahon": 641857,
  "Jurickson Profar": 595777,
  "Kyle Schwarber": 656941,
  "Luis Robert Jr.": 673357,
  "Byron Buxton": 621439,
  "Randy Arozarena": 668227,
  "Yainer Diaz": 673237,
  "Kris Bryant": 592178,
  "Mike Trout": 545361,
  "Elly De La Cruz": 682829,
  "Colton Cowser": 681297,
  "Ian Happ": 664023,
  "Michael Busch": 683737,
  "Connor Norby": 681393,
  "Jake Burger": 669394,
  "Francisco Lindor": 596019,
  "James Wood": 695578,
  "Max Kepler": 596146,
  "Brenton Doyle": 686668,
  "Luke Raley": 670042,
  "Juan Soto": 665742,
  "Eugenio Suárez": 553993,
  "Joc Pederson": 592626,
  "JJ Bleday": 668709,
  "Spencer Torkelson": 679529,
  "Jake Cronenworth": 630105,
  "Kerry Carpenter": 681481,
  "Rhys Hoskins": 656555,
  "Max Muncy": 571970,
  "Christian Encarnacion-Strand": 687952,
  "Kyle Manzardo": 700932,
  "Lourdes Gurriel Jr.": 666971,
  "Brent Rooker": 667670,
  "Triston Casas": 671213,
  "Jackson Chourio": 694192,
  "Ozzie Albies": 645277,
  "Jhonkensy Noel": 678877,
  "Deyvison De Los Santos": 691277,
  "Gunnar Henderson": 683002,
  "Teoscar Hernández": 606192,
  "Heliot Ramos": 671218,
  "Matt McLain": 680574,
  "CJ Abrams": 682928,
  "Matt Shaw": 807713,
  "Marcell Ozuna": 542303,
  "Willy Adames": 642715,
  "Brandon Lowe": 664040,
  "Logan O'Hoppe": 681351,
  "Bo Bichette": 666182,
  "Tyler Fitzgerald": 666149,
  "Rafael Devers": 646240,
  "Christian Walker": 572233,
  "Salvador Perez": 521692,
  "Michael Harris II": 671739,
  "George Springer": 543807,
  "Lars Nootbaar": 663457,
  "José Ramírez": 608070,
  "Adolis García": 666969,
  "Nick Castellanos": 592206,
  "Gleyber Torres": 650402,
  "Jose Altuve": 514888,
  "Kristian Campbell": 692225,
  "Pete Alonso": 624413,
  "Josh Naylor": 647304,
  "Corbin Carroll": 682998,
  "Austin Wells": 669224,
  "Adley Rutschman": 668939,
  "Anthony Volpe": 683011,
  "Bryce Harper": 547180,
  "Lawrence Butler": 671732,
  "Willson Contreras": 575929,
  "Ezequiel Tovar": 678662,
  "Jo Adell": 666176,
  "Ryan Jeffers": 680777,
  "Austin Riley": 663586,
  "Ketel Marte": 606466,
  "Junior Caminero": 691406,
  "Jose Siri": 642350,
  "Ryan Mountcastle": 663624,
  "Cedric Mullins": 656775,
  "Matt Chapman": 656305,
  "Jorge Soler": 624585,
  "Christopher Morel": 666624,
  "Bryan Reynolds": 668804,
  "Alec Bohm": 664761,
  "Josh Bell": 605137,
  "Bobby Witt Jr.": 677951,
  "Jackson Merrill": 701538,
  "Freddie Freeman": 518692,
  "Brandon Nimmo": 607043,
  "Lane Thomas": 657041,
  "Nathaniel Lowe": 663993,
  "Mookie Betts": 605141,
  "Alex Bregman": 608324,
  "Wyatt Langford": 694671,
  "Michael Conforto": 624424,
  "Dansby Swanson": 621020,
  "Zach Neto": 687263,
  "Vladimir Guerrero Jr.": 665489,
  "Manny Machado": 592518,
  "Trevor Story": 596115,
  "Jarren Duran": 680776,
  "Will Smith": 669257,
  "Wilyer Abreu": 677800
};

function fetchPlayerId(playerName) {
  return playerIdLookup[playerName] || null;
}

// Disable all console logs
//console.log = function() {};

// Your other script code here
console.log("This will not appear in the console");

// Other functions, variables, etc.

async function fetchPlayerStats() {
  // Clear previous player stats to fetch new data
  playerHomeRuns = {};  // Reset the player home run data

  // Hide the loading indicator
  document.getElementById("loading-indicator").style.display = "none";
  document.getElementById("team-container").innerHTML = "<p>Loading teams...</p>";  // Show loading message

  try {
    // --- NEW: preload (optimized) ---
    // 1) team ids (cached)
    await ensurePlayerTeamIdsLoaded();
    // 1b) team season games played (for HR pace projection)
    await ensureTeamGamesPlayedLoaded();
    // 2) today's schedule statuses (single call)
    await fetchTodaysTeamStatuses();
    // 3) lineup / participation context for today
    await fetchTodaysParticipationData();
    // 4) injured list statuses
    await ensurePlayerILStatusesLoaded();
    // 5) NEW: HR counts across today's schedule games (doubleheaders included)
    await fetchTodaysHomeRunCounts();

    const batchSize = 5; // Size of each batch for requests
    let playerRequests = [];
    let batchResults = [];

    // Create batches of player stats requests
    for (let i = 0; i < fantasyTeams.length; i++) {
      const team = fantasyTeams[i];

      // Group players in batches of size 'batchSize'
      const batch = [];
      for (let j = 0; j < team.players.length; j++) {
        const player = team.players[j];

        batch.push(fetchPlayerStatsForPlayer(player));

        // Process batch when reaching batchSize or last player
        if (batch.length === batchSize || j === team.players.length - 1) {
          playerRequests.push(batch);
          batchResults.push(await processBatch(batch));
          batch.length = 0;  // Reset for the next batch
        }
      }
    }

    // Flatten the batch results and then continue processing
    batchResults = batchResults.flat();
    displayFantasyTeams();  // Now display the updated teams
    const now = new Date();
    document.getElementById("last-update").textContent = "Last updated: " + now.toLocaleString();

  } catch (error) {
    console.error("Error fetching player stats:", error);
  } finally {
    document.getElementById("loading-indicator").style.display = "none";
  }
}

async function ensureTeamGamesPlayedLoaded() {
  if (teamGamesPlayedByTeamId.size > 0) return;
  if (teamGamesPlayedLoadPromise) {
    await teamGamesPlayedLoadPromise;
    return;
  }

  teamGamesPlayedLoadPromise = (async () => {
    try {
      const url = `https://statsapi.mlb.com/api/v1/standings?leagueId=103,104&season=${CURRENT_SEASON}&standingsTypes=regularSeason`;
      const response = await fetch(url);
      const data = await response.json();
      const records = data?.records || [];
      const map = new Map();

      for (const record of records) {
        for (const tr of (record?.teamRecords || [])) {
          const teamId = tr?.team?.id;
          const gp = Number(tr?.gamesPlayed || 0);
          if (teamId) map.set(teamId, gp);
        }
      }

      teamGamesPlayedByTeamId = map;
    } catch (error) {
      console.warn('Failed to load team games played for HR pace:', error);
      teamGamesPlayedByTeamId = new Map();
    } finally {
      teamGamesPlayedLoadPromise = null;
    }
  })();

  await teamGamesPlayedLoadPromise;
}

function getTeamGamesRemainingForPlayer(playerId) {
  const teamId = playerTeamIdByPlayerId.get(playerId);
  if (!teamId) return null;
  const gamesPlayed = Number(teamGamesPlayedByTeamId.get(teamId));
  if (!Number.isFinite(gamesPlayed)) return null;
  return Math.max(0, 162 - gamesPlayed);
}

async function fetchSeasonHittingStats(playerId) {
  if (playerSeasonStats[playerId]) return playerSeasonStats[playerId];

  try {
    const response = await fetch(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=season&season=${CURRENT_SEASON}&gameType=R&group=hitting`);
    const data = await response.json();
    const split = data?.stats?.[0]?.splits?.[0];
    const s = split?.stat || {};

    const normalized = {
      homeRuns: Number(s.homeRuns || 0),
      rbi: Number(s.rbi || 0),
      runs: Number(s.runs || 0),
      avg: Number(s.avg || 0),
      obp: Number(s.obp || 0),
      slg: Number(s.slg || 0),
      ops: Number(s.ops || 0),
      gamesPlayed: Number(s.gamesPlayed || s.games || 0),
      atBats: Number(s.atBats || 0),
      plateAppearances: Number(s.plateAppearances || 0),
      hits: Number(s.hits || 0),
      baseOnBalls: Number(s.baseOnBalls || 0),
      strikeOuts: Number(s.strikeOuts || 0),
      doubles: Number(s.doubles || 0),
      triples: Number(s.triples || 0),
      stolenBases: Number(s.stolenBases || 0)
    };

    playerSeasonStats[playerId] = normalized;
    return normalized;
  } catch (error) {
    console.error(`Error fetching season hitting stats for player ${playerId}:`, error);
    const fallback = {
      homeRuns: 0, rbi: 0, runs: 0,
      avg: 0, obp: 0, slg: 0, ops: 0,
      gamesPlayed: 0, atBats: 0, plateAppearances: 0, hits: 0,
      baseOnBalls: 0, strikeOuts: 0,
      doubles: 0, triples: 0, stolenBases: 0
    };
    playerSeasonStats[playerId] = fallback;
    return fallback;
  }
}

async function fetchSeasonHomeRuns(playerId) {
  try {
    const response = await fetch(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=season&season=${CURRENT_SEASON}&gameType=R&group=hitting`);
    const data = await response.json();

    // Check if the data exists and has the correct structure
    if (data.stats && data.stats[0] && data.stats[0].splits && data.stats[0].splits.length > 0) {
      return data.stats[0].splits[0].stat.homeRuns || 0;
    }

    // If no data or stats are found, return 0
    return 0;
  } catch (error) {
    console.error(`Error fetching season home runs for player ${playerId}:`, error);
    return 0; // Return 0 in case of any error
  }
}

// Helper function to fetch stats for a single player
async function fetchPlayerStatsForPlayer(player) {
  try {
    const playerId = player.id || player.playerId || fetchPlayerId(player.name);
    if (!playerId) {
      throw new Error(`Player ID for ${player.name} not found.`);
    }
    const seasonStats = await fetchSeasonHittingStats(playerId);
    playerSeasonStats[playerId] = seasonStats;
    playerHomeRuns[playerId] = seasonStats.homeRuns || 0;
    return seasonStats;
  } catch (error) {
    console.error(`Error fetching stats for player ${player.name}:`, error);
    return null;
  }
}

// Process each batch using `Promise.allSettled` for error resilience
async function processBatch(batch) {
  const batchResults = await Promise.allSettled(batch);
  // Handle each batch result: successes and failures
  return batchResults.map(result => {
    if (result.status === 'fulfilled') {
      return result.value; // Successfully fetched stats
    } else {
      console.error(`Failed to fetch data for player: ${result.reason}`);
      return null; // Return null for failed requests to prevent breaking the app
    }
  });
}

function getRankSuffix(rank) {
  const lastDigit = rank % 10;
  const lastTwoDigits = rank % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return 'th';
  if (lastDigit === 1) return 'st';
  if (lastDigit === 2) return 'nd';
  if (lastDigit === 3) return 'rd';
  return 'th';
}


const MOBILE_LEADERBOARD_BREAKPOINT = 768;
let mobileLeaderboardExpandedAll = false;
let mobileExpandedTeams = new Set();

function isMobileLeaderboardView() {
  return window.innerWidth <= MOBILE_LEADERBOARD_BREAKPOINT;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function syncExpandAllTeamsButton() {
  const btn = document.getElementById("expand-all-teams-btn");
  if (!btn) return;
  const shouldShow = isMobileLeaderboardView();
  btn.hidden = !shouldShow;
  btn.textContent = mobileLeaderboardExpandedAll ? "Collapse All Teams" : "Expand All Teams";
  btn.setAttribute("aria-pressed", mobileLeaderboardExpandedAll ? "true" : "false");
}

function setAllMobileTeamsExpanded(expanded) {
  mobileLeaderboardExpandedAll = !!expanded;
  mobileExpandedTeams = expanded ? new Set(fantasyTeams.map(team => team.name)) : new Set();
}

function bindMobileLeaderboardInteractions(container) {
  if (!container || !isMobileLeaderboardView()) return;

  container.querySelectorAll(".team-mobile-card").forEach(card => {
    card.addEventListener("click", (e) => {
      const teamName = card.dataset.teamName;
      if (!teamName) return;

      if (mobileExpandedTeams.has(teamName)) {
        mobileExpandedTeams.delete(teamName);
      } else {
        mobileExpandedTeams.add(teamName);
      }

      mobileLeaderboardExpandedAll = mobileExpandedTeams.size === fantasyTeams.length;
      syncExpandAllTeamsButton();
      displayFantasyTeams();
    });

    card.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      card.click();
    });
  });
}


function displayFantasyTeams() {

  // Step 1: Calculate top 4 totals and sort
  let teamsWithTotals = fantasyTeams.slice().map(team => ({
    ...team,
    top4: topFourTotal(team)
  }));

  teamsWithTotals.sort((a, b) => b.top4 - a.top4);

  // Step 2: Assign rank labels and numeric ranks
  let sortedTeams = [];
  let actualRanks = [];
  let rankLabels = [];

  let currentRank = 1;
  let i = 0;

  while (i < teamsWithTotals.length) {
    const currentTeam = teamsWithTotals[i];
    const tiedTeams = [currentTeam];

    let j = i + 1;
    while (
      j < teamsWithTotals.length &&
      teamsWithTotals[j].top4 === currentTeam.top4
    ) {
      tiedTeams.push(teamsWithTotals[j]);
      j++;
    }

    const suffix = getRankSuffix(currentRank);
    const isTied = tiedTeams.length > 1;
    const label = isTied
      ? `T-${currentRank}${suffix}`
      : `${currentRank}${suffix}`;

    tiedTeams.forEach(() => {
      actualRanks.push(currentRank);
      rankLabels.push(label);
    });

    sortedTeams.push(...tiedTeams);
    currentRank += tiedTeams.length;
    i = j;
  }

  const isMobile = isMobileLeaderboardView();
  let teamsHtml = "";

  sortedTeams.forEach((team, index) => {
    let playersHtml = "";

    let sortedPlayers = team.players.slice().sort((a, b) => {
      return (playerHomeRuns[b.id] || 0) - (playerHomeRuns[a.id] || 0);
    });

    sortedPlayers.forEach(player => {
      const hr = playerHomeRuns[player.id] || 0;
      const playerImageUrl = `https://midfield.mlbstatic.com/v1/people/${player.id}/headshot/60x60.jpg`;

      const displayState = getPlayerDisplayState(player.id);
      const hrTodayCount = playerHRTodayCount.get(player.id) || 0;
      const hrTodayBadge = formatHRTodayBadge(hrTodayCount);

      playersHtml += `
        <li>
          <img src="${playerImageUrl}" alt="${player.name}" class="player-headshot">
          ${player.name} - ${hr}
          ${displayState.html}
          ${hrTodayBadge || ""}
        </li>
      `;
    });

    const top4 = topFourTotal(team);

    let teamClass = "";
    const actualRank = actualRanks[index];
    if (actualRank === 1) teamClass = "gold";
    else if (actualRank === 2) teamClass = "silver";
    else if (actualRank === 3) teamClass = "bronze";

    if (isMobile) {
      const teamNameSafe = escapeHtml(team.name);
      const panelId = `team-mobile-panel-${index}`;
      const isExpanded = mobileExpandedTeams.has(team.name);

      teamsHtml += `
        <div class="team team-mobile-card ${teamClass} ${isExpanded ? "is-expanded" : ""}" data-team-name="${teamNameSafe}" data-rank="${rankLabels[index]}" role="button" tabindex="0" aria-expanded="${isExpanded ? "true" : "false"}" aria-controls="${panelId}">
          <div class="team-mobile-toggle">
            <div class="team-mobile-toggle-main">
              <div class="team-mobile-rank-row">
                <h3 class="team-rank">${rankLabels[index]}</h3>
              </div>
              <h2>${team.name}</h2>
              <div class="team-mobile-total-preview">Top 4 Total: <span class="top4-total-number">${top4}</span></div>
            </div>
          </div>
          <div id="${panelId}" class="team-mobile-panel" ${isExpanded ? "" : "hidden"}>
            <ul>${playersHtml}</ul>
            <div class="total-home-runs">
            Top 4 Total: <span class="top4-total-number">${top4}</span>
          </div>
          </div>
        </div>
      `;
    } else {
      teamsHtml += `
      <div class="col-md-3 col-6">
          <div class="team ${teamClass}">
              <h3 class="team-rank">${rankLabels[index]}</h3>
              <h2>${team.name}</h2>
              <ul>${playersHtml}</ul>
              <div class="total-home-runs">
              Top 4 Total: <span class="top4-total-number">${top4}</span>
            </div>
          </div>
      </div>
      `;
    }
  });

  const container = document.getElementById("team-container");
  container.style.visibility = "hidden";
  container.innerHTML = teamsHtml;
  container.style.visibility = "visible";

  syncExpandAllTeamsButton();
  bindMobileLeaderboardInteractions(container);
}

function topFourTotal(team) {
  return team.players
    .map(player => playerHomeRuns[player.id] || 0)
    .sort((a, b) => b - a)
    .slice(0, 4)
    .reduce((sum, val) => sum + val, 0);
}

// --- Monthly Totals Functions (New Tab) ---
// Updated month mapping: Combine March and April into "March/April"
async function fetchMonthlyHomeRuns(playerId) {
  try {
    // Fetch game log data for Spring Training games
    const response = await fetch(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=gameLog&season=${CURRENT_SEASON}&gameType=R&group=hitting`);
    const data = await response.json();

    let monthlyStats = {
      "March/April": 0,
      "May": 0,
      "June": 0,
      "July": 0,
      "August": 0,
      "September": 0
    };

    // Check if the data is in the expected format
    if (data.stats && data.stats[0] && data.stats[0].splits && data.stats[0].splits.length > 0) {
      data.stats[0].splits.forEach(split => {
        const gameDate = new Date(split.date);
        const month = gameDate.getUTCMonth(); // Use UTC month to avoid timezone shifts

        // Aggregate home runs per month
        const gameHR = parseInt(split.stat.homeRuns, 10) || 0;

        if (month === 2 || month === 3) { // March/April
          monthlyStats["March/April"] += gameHR;
        } else if (month === 4) { // May
          monthlyStats["May"] += gameHR;
        } else if (month === 5) { // June
          monthlyStats["June"] += gameHR;
        } else if (month === 6) { // July
          monthlyStats["July"] += gameHR;
        } else if (month === 7) { // August
          monthlyStats["August"] += gameHR;
        } else if (month === 8) { // September
          monthlyStats["September"] += gameHR;
        }
      });
    } else {
      console.warn(`No game log data available for player ${playerId}.`);
    }

    return monthlyStats;
  } catch (error) {
    console.error(`Error fetching monthly home runs for player ${playerId}:`, error);
    return {}; // Return empty object if error occurs
  }
}

async function fetchMonthlyStats() {
  document.getElementById("loading-indicator").style.display = "flex";

  // Ensure dropdown appears before fetching stats
  populateMobileMonthDropdown();

  try {
    await Promise.all(fantasyTeams.flatMap(team =>
      team.players.map(async player => {
        if (player.id) {
          playerMonthlyStats[player.id] = await fetchMonthlyHomeRuns(player.id);
        }
      })
    ));

    displayMonthlyStats();
  } catch (error) {
    console.error("Error fetching monthly stats:", error);
  } finally {
    document.getElementById("loading-indicator").style.display = "none";
  }
}

// Function to populate the dropdown menu with available months
function populateMobileMonthDropdown() {
  const months = ["March/April", "May", "June", "July", "August", "September"];
  const selectEl = document.getElementById("mobile-month-select");

  // Clear options
  selectEl.innerHTML = '<option value="">-- Select a Month --</option>';

  months.forEach(month => {
    const opt = document.createElement("option");
    opt.value = month;
    opt.textContent = month;
    selectEl.appendChild(opt);
  });

  // Detect current month and set as default
  const now = new Date();
  const currentMonthIndex = now.getMonth();

  let defaultLabel = "";
  if (currentMonthIndex === 2 || currentMonthIndex === 3) defaultLabel = "March/April";
  else if (currentMonthIndex === 4) defaultLabel = "May";
  else if (currentMonthIndex === 5) defaultLabel = "June";
  else if (currentMonthIndex === 6) defaultLabel = "July";
  else if (currentMonthIndex === 7) defaultLabel = "August";
  else if (currentMonthIndex === 8) defaultLabel = "September";

  if (defaultLabel) {
    selectEl.value = defaultLabel; // Prefill the dropdown
  }
}

// Function to handle mobile month selection
function handleMobileMonthChange() {
  const selectedMonth = document.getElementById("mobile-month-select").value;
  const mobileContainer = document.getElementById("monthly-container");

  if (!selectedMonth) {
    mobileContainer.innerHTML = "";
    mobileContainer.style.display = "none";
    return;
  }

  // Ensure container and dropdown are visible
  mobileContainer.style.display = "block";
  document.getElementById("mobile-month-select").style.display = "block";

  // Array to store team totals
  let teamStats = [];

  // Loop through teams and calculate their top 5 HR totals for this month
  fantasyTeams.forEach(team => {
    let totals = team.players.map(player => {
      let monthlyData = playerMonthlyStats[player.id] || {};
      return monthlyData[selectedMonth] || 0;
    });

    totals.sort((a, b) => b - a);
    const top5Sum = totals.slice(0, 5).reduce((sum, val) => sum + val, 0);

    teamStats.push({ name: team.name, total: top5Sum });
  });

  // Sort teams in descending order (highest HRs first)
  teamStats.sort((a, b) => b.total - a.total);

  // Find the highest total for highlighting
  let maxTotal = teamStats.length > 0 ? teamStats[0].total : 0;

  // Build the mini-table
  let html = `
    <h3>${selectedMonth} Home Run Totals</h3>
    <table class="monthly-table-mobile" style="margin: 0 auto;">
      <thead>
        <tr>
          <th>Team</th>
          <th>Top 5 HR</th>
        </tr>
      </thead>
      <tbody>
  `;

  teamStats.forEach(team => {
    let highlightStyle = team.total === maxTotal ? 'style="background-color: yellow; font-weight: bold;"' : '';
    html += `
      <tr ${highlightStyle}>
        <td>${team.name}</td>
        <td>${team.total}</td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  mobileContainer.innerHTML = html; // Inject the sorted and highlighted table
}

// In the monthly totals, for each team and for each month,
// only the top 5 players' home run totals are summed.
function displayMonthlyStats() {
  const months = ["March/April", "May", "June", "July", "August", "September"];

  let maxTotals = {};
  months.forEach(month => { maxTotals[month] = 0; });

  // Compute maximum top 5 total for each month across teams
  fantasyTeams.forEach(team => {
    months.forEach(month => {
      let totals = team.players.map(player => {
        let monthly = playerMonthlyStats[player.id] || {};
        return monthly[month] || 0;
      });

      // Ensure all values are valid numbers
      totals = totals.filter(num => typeof num === "number" && !isNaN(num));

      // Sort from highest to lowest
      totals.sort((a, b) => b - a);

      // Sum only the top 5 values
      let teamTotal = totals.slice(0, 5).reduce((sum, val) => sum + val, 0);

      if (teamTotal > maxTotals[month]) {
        maxTotals[month] = teamTotal;
      }
    });
  });

  let html = `<table class="monthly-table">
                <thead>
                  <tr>
                    <th>Team</th>`;
  months.forEach(month => {
    html += `<th onclick="sortMonthlyTable(${months.indexOf(month) + 1})" style="cursor: pointer;">${month} ⬍</th>`;
  });
  html += `</tr></thead><tbody>`;

  fantasyTeams.forEach(team => {
    let row = `<tr><td>${team.name}</td>`;
    months.forEach(month => {
      let totals = team.players.map(player => {
        let monthly = playerMonthlyStats[player.id] || {};
        return monthly[month] || 0;
      });

      // Ensure valid numbers
      totals = totals.filter(num => typeof num === "number" && !isNaN(num));
      totals.sort((a, b) => b - a);
      let teamTotal = totals.slice(0, 5).reduce((sum, val) => sum + val, 0);

      if (teamTotal === maxTotals[month] && maxTotals[month] > 0) {
        row += `<td style="background-color: yellow;"><strong>${teamTotal}</strong></td>`;
      } else {
        row += `<td>${teamTotal}</td>`;
      }
    });
    row += `</tr>`;
    html += row;
  });

  html += `</tbody></table>`;
  document.getElementById("monthly-container").innerHTML = html;
}

function sortMonthlyTable(columnIndex) {
  let table = document.querySelector(".monthly-table tbody");
  let rows = Array.from(table.rows);

  // Check current sorting state for this column
  let currentSort = table.getAttribute("data-sort");
  let isDescending = currentSort !== columnIndex.toString(); // Default to descending on first click

  rows.sort((rowA, rowB) => {
    let a = parseInt(rowA.cells[columnIndex].textContent) || 0;
    let b = parseInt(rowB.cells[columnIndex].textContent) || 0;
    return isDescending ? b - a : a - b;
  });

  table.innerHTML = "";
  rows.forEach(row => table.appendChild(row));

  // Update sorting state
  table.setAttribute("data-sort", isDescending ? columnIndex.toString() : "");
}

let feedDataLoaded = false; // Flag to track if feed data is loaded

// Convert UTC to Eastern Time (ET)
function convertUTCToET(utcDateString) {
  const utcDate = new Date(utcDateString); // Create Date object from UTC string
  const timezoneOffset = 4 * 60; // Eastern Daylight Time (EDT) is UTC-4 in hours (adjust for DST)

  // Adjust for the Eastern Time Zone
  const etDate = new Date(utcDate.getTime() - (timezoneOffset * 60 * 1000)); // Convert by offset

  return etDate;
}

async function fetchHomeRunFeed() {
  try {
    const seenPlays = new Set();
    // Clear any existing cached feed data
    sessionStorage.removeItem("homeRunFeedData");

    // Show the loading spinner and reset the percentage
    document.getElementById("loading-spinner").style.display = "block";
    let percentage = 0;
    const percentageElement = document.getElementById("spinner-percentage");
    percentageElement.textContent = `${percentage}%`; // Start at 0%

    let homeRuns = JSON.parse(sessionStorage.getItem("homeRunFeedData")) || [];
    const maxHomeRuns = 25; // Limit to the 25 most recent home runs

    if (homeRuns.length === 0) {
      let daysBack = 0;
      const totalRequests = 30;

      while (homeRuns.length < maxHomeRuns && daysBack < totalRequests) {
        let date = new Date();
        date.setDate(date.getDate() - daysBack);
        const formattedDateForAPI = date.toISOString().split("T")[0]; // used in API call

        let formattedDateTime = date.toISOString();  // Full date-time with time

        // Simulate progress
        percentage = Math.floor((daysBack / totalRequests) * 100);
        percentageElement.textContent = `${percentage}%`; // Update the percentage text

        const scheduleResponse = await fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${formattedDateForAPI}&gameTypes=S,R`);
        const scheduleData = await scheduleResponse.json();

        if (!scheduleData.dates || scheduleData.dates.length === 0) {
          daysBack++;
          continue;
        }

        for (const game of scheduleData.dates[0].games) {

          // Only allow Spring Training (S) and Regular Season (R) games — skip exhibitions, etc.
          if (game.gameType !== "R" && game.gameType !== "S") continue;
        
          const gameId = game.gamePk;
          const gameDate = game.date;

          // Convert the game date from UTC to Eastern Time
          const gameDateET = convertUTCToET(gameDate);

          const gameDataResponse = await fetch(`https://statsapi.mlb.com/api/v1/game/${gameId}/playByPlay?events=home_run`);
          const gameData = await gameDataResponse.json();

          if (!gameData.allPlays || gameData.allPlays.length === 0) continue;

          gameData.allPlays.forEach(play => {
            if (play.result.eventType === "home_run") {
              const playerName = play.matchup.batter.fullName;
              const playerId = play.matchup.batter.id;
              const atBatIndex = play.about.atBatIndex;
              const key = `${playerId}-${gameId}-${atBatIndex}`;

              if (seenPlays.has(key)) return;
              seenPlays.add(key);

              const playEndTime = play.playEndTime;

              const isFantasyPlayer = fantasyTeams.some(team =>
                team.players.some(player => player.name === playerName)
              );

              if (isFantasyPlayer) {
                const fantasyTeamName = fantasyTeams.find(team =>
                  team.players.some(player => player.name === playerName)
                )?.name;

                let utcPlayEndTime = playEndTime ? new Date(playEndTime).toISOString() : formattedDateTime;

                const hitEvent = play.playEvents?.find(event => event?.hitData) || {};
                const hitData = hitEvent.hitData || {};

                const etDate = convertUTCToET(utcPlayEndTime);
                const formattedETDate = `${etDate.getMonth() + 1}/${etDate.getDate()}`;

                const description = play.result?.description || "";
                let hrNumberMatch = description.match(/\((\d+)\)/);
                const hrNumber = hrNumberMatch ? parseInt(hrNumberMatch[1], 10) : 1;

                homeRuns.push({
                  team: fantasyTeamName,
                  player: playerName,
                  date: formattedETDate,
                  dateTime: utcPlayEndTime,
                  distance: hitData.totalDistance || null,
                  launchSpeed: hitData.launchSpeed || null,
                  launchAngle: hitData.launchAngle || null,
                  hrNumber: hrNumber
                });
              }
            }
          });

          if (homeRuns.length >= maxHomeRuns) break;
        }

        if (homeRuns.length >= maxHomeRuns) break;
        daysBack++;
      }

      // Sort home runs by playEndTime in UTC (most recent first)
      homeRuns.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

      // Ensure we only have the top 25 home runs
      homeRuns = homeRuns.slice(0, maxHomeRuns);
      sessionStorage.setItem("homeRunFeedData", JSON.stringify(homeRuns));
    }

    document.getElementById("loading-spinner").style.display = "none"; // Hide spinner

    const feedBody = document.getElementById("feed-body");
    feedBody.innerHTML = "";

    // Display home runs in sorted order
    homeRuns.forEach(hr => {
      const details = hr.distance
        ? `${hr.distance} ft<br><span class="ev">${hr.launchSpeed} mph</span>`
        : "—";

      const row = `<tr>
        <td>${hr.team}</td>
        <td><strong>${hr.player} (${hr.hrNumber})</strong></td>
        <td>${details}</td>
        <td>${hr.date}</td>
      </tr>`;

      feedBody.innerHTML += row;
    });

  } catch (error) {
    console.error("🚨 Error fetching home run data:", error);
    document.getElementById("loading-spinner").style.display = "none"; // Hide spinner in case of error
  }
}

// 🔄 Auto-refresh the feed every 5 minutes
setInterval(fetchHomeRunFeed, 300000); // Fetch every 5 minutes

// Initially load the data when the page is loaded or when switching tabs
fetchHomeRunFeed(); // Trigger on page load

function calculateAndDisplayWinnings() {
  const payouts = [1100, 650, 450, 350, 300, 250, 200];

  // Step 1: Calculate top 4 totals
  let teams = fantasyTeams.map(team => ({
    name: team.name,
    top4: topFourTotal(team)
  }));

  // Step 2: Sort by total
  teams.sort((a, b) => b.top4 - a.top4);

  let results = [];
  let i = 0;

  while (i < teams.length && i < payouts.length) {
    let tied = [teams[i]];
    let j = i + 1;

    while (j < teams.length && teams[j].top4 === teams[i].top4) {
      tied.push(teams[j]);
      j++;
    }

    const place = i + 1;
    const label = tied.length > 1 ? `T-${place}` : `${place}`;

    const payoutSlice = payouts.slice(i, i + tied.length);
    const sum = payoutSlice.reduce((a, b) => a + b, 0);
    const perTeam = (sum / tied.length).toFixed(2);

    tied.forEach(team => {
      results.push({
        place: label,
        name: team.name,
        payout: `$${perTeam}`
      });
    });

    i += tied.length;
  }

  // Inject into HTML
  const tbody = document.getElementById("winnings-body");
  tbody.innerHTML = "";

  results.forEach(row => {
    tbody.innerHTML += `
      <tr>
        <td>${row.place}</td>
        <td>${row.name}</td>
        <td>${row.payout}</td>
      </tr>
    `;
  });
}

function setActiveTabClass(tab) {
  document.body.classList.remove("monthly-active", "feed-active", "winnings-active", "teamstats-active");
  if (tab) document.body.classList.add(tab);
}

// --- Tab Switching Logic ---
document.getElementById("season-tab").addEventListener("click", () => {
  // Show the team container (leaderboard) and hide the other containers
  document.getElementById("team-container").style.display = "grid";
  document.getElementById("monthly-container").style.display = "none";
  document.getElementById("feed-container").style.display = "none";
  document.getElementById("winnings-container").style.display = "none"; // Hide winnings
  document.getElementById("team-stats-container") && (document.getElementById("team-stats-container").style.display = "none")

  // Hide dropdown only on mobile
  if (window.innerWidth <= 768) {
    document.getElementById("mobile-month-select").style.display = "none";
  }

  // ✅ set active tab state (leaderboard = none)
  setActiveTabClass("");

  // Fetch fresh player stats when the "Leaderboard" tab is clicked
  fetchPlayerStats();
});

document.getElementById("monthly-tab").addEventListener("click", async () => {
  document.getElementById("team-container").style.display = "none";
  document.getElementById("monthly-container").style.display = "block";
  document.getElementById("feed-container").style.display = "none";
  document.getElementById("winnings-container").style.display = "none";
  document.getElementById("team-stats-container") && (document.getElementById("team-stats-container").style.display = "none");

  // ✅ set active tab state
  setActiveTabClass("monthly-active");

  await fetchMonthlyStats(); // ✅ Wait for stats to load fully

  // ✅ Mobile only: show default month table after data is ready
  if (window.innerWidth <= 768) {
    const selectedMonth = document.getElementById("mobile-month-select").value;
    if (selectedMonth) {
      handleMobileMonthChange();
    }
  }
});

document.getElementById("feed-tab").addEventListener("click", () => {
  // Hide other containers and show the feed container
  document.getElementById("team-container").style.display = "none";
  document.getElementById("monthly-container").style.display = "none";
  document.getElementById("feed-container").style.display = "block";
  document.getElementById("winnings-container").style.display = "none"; // Hide winnings
  document.getElementById("team-stats-container") && (document.getElementById("team-stats-container").style.display = "none")

  // Hide dropdown only on mobile when viewing the feed
  if (window.innerWidth <= 768) {
    document.getElementById("mobile-month-select").style.display = "none";
  }

  // ✅ set active tab state
  setActiveTabClass("feed-active");

  // Check if feed data is already loaded
  if (!feedDataLoaded) {
    console.log("Fetching Home Run Feed data...");
    fetchHomeRunFeed();
  }
});

document.getElementById("winnings-tab").addEventListener("click", () => {
  // Hide other containers and show the winnings container
  document.getElementById("team-container").style.display = "none";
  document.getElementById("monthly-container").style.display = "none";
  document.getElementById("feed-container").style.display = "none";
  document.getElementById("winnings-container").style.display = "block";
  document.getElementById("team-stats-container") && (document.getElementById("team-stats-container").style.display = "none");

  // Hide dropdown only on mobile when viewing the winnings tab
  if (window.innerWidth <= 768) {
    document.getElementById("mobile-month-select").style.display = "none";
  }

  // ✅ set active tab state
  setActiveTabClass("winnings-active");

  // Run the logic to calculate and display winnings
  calculateAndDisplayWinnings();
});



function wireMobileBottomNav() {
  const tabMap = [
    ["mobile-season-tab", "season-tab"],
    ["mobile-monthly-tab", "monthly-tab"],
    ["mobile-feed-tab", "feed-tab"],
    ["mobile-teamstats-tab", "teamstats-tab"],
    ["mobile-winnings-tab", "winnings-tab"]
  ];

  tabMap.forEach(([mobileId, desktopId]) => {
    const mobileBtn = document.getElementById(mobileId);
    const desktopBtn = document.getElementById(desktopId);
    if (!mobileBtn || !desktopBtn) return;

    mobileBtn.addEventListener("click", () => {
      desktopBtn.click();
    });
  });
}

wireMobileBottomNav();





// =========================
// Team Stats tab
// =========================
let teamStatsUIInitialized = false;
let teamStatsSort = { key: "hr", dir: "desc" };

function initTeamStatsUI() {
  if (teamStatsUIInitialized) return;
  const sel = document.getElementById("ts-team-select");
  if (!sel) return;
  sel.innerHTML = [
    `<option value="league">Select a Team</option>`,
    ...fantasyTeams.map((t, i) => `<option value="${i}">${t.name}</option>`)
  ].join("");
  sel.value = "league";
  sel.addEventListener("change", renderTeamStats);
  document.getElementById("ts-search")?.addEventListener("input", renderTeamStats);
  document.querySelectorAll(".ts-sortable").forEach(th => {
    th.addEventListener("click", () => {
      const key = th.dataset.sort;
      if (!key) return;
      if (teamStatsSort.key === key) {
        teamStatsSort.dir = teamStatsSort.dir === "desc" ? "asc" : "desc";
      } else {
        teamStatsSort.key = key;
        if (key === "name" || key === "teamName") {
          teamStatsSort.dir = "asc";
        } else if (key === "abPerHr") {
          teamStatsSort.dir = "asc";
        } else {
          teamStatsSort.dir = "desc";
        }
      }
      renderTeamStats();
    });
  });
  teamStatsUIInitialized = true;
}

function tsHeadshotUrl(playerId) {
  return playerId
    ? `https://midfield.mlbstatic.com/v1/people/${playerId}/headshot/120x120.jpg`
    : '';
}

function tsInitials(name) {
  const parts = String(name || "").replace(".", "").split(" ").filter(Boolean);
  const a = parts[0]?.[0] || "P";
  const b = parts[parts.length - 1]?.[0] || "X";
  return (a + b).toUpperCase();
}
function tsAvg(arr) {
  const nums = arr.filter(n => Number.isFinite(n));
  if (!nums.length) return null;
  return nums.reduce((a,b)=>a+b,0)/nums.length;
}
function tsFmt3(n) { return Number.isFinite(n) && n !== 0 ? n.toFixed(3) : "—"; }
function tsFmt1(n) { return Number.isFinite(n) ? n.toFixed(1) : "—"; }
function tsFmtInt(n) { return Number.isFinite(n) ? String(Math.trunc(n)) : "—"; }
function tsAbPerHr(r) {
  if (!r.hr || !r.atBats) return null;
  return r.atBats / r.hr;
}
function tsHrPace(r) {
  if (!r.gamesPlayed || !r.hr) return null;
  const gamesPerHr = r.gamesPlayed / r.hr;
  const teamGamesRemaining = getTeamGamesRemainingForPlayer(r.playerId);
  if (teamGamesRemaining === null) {
    return (r.hr / r.gamesPlayed) * 162;
  }
  const projectedAdditionalHr = teamGamesRemaining / gamesPerHr;
  return r.hr + projectedAdditionalHr;
}

async function ensureHrEventDataLoaded() {
  if (Object.keys(hrEventDataByPlayer).length > 0) return;
  if (hrEventDataLoadPromise) {
    await hrEventDataLoadPromise;
    return;
  }

  hrEventDataLoadPromise = (async () => {
    try {
      const response = await fetch(`data/hr-events-${CURRENT_SEASON}.json`, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Failed to load hr-events JSON: ${response.status}`);
      }

      const data = await response.json();
      const events = Array.isArray(data?.events) ? data.events : [];
      const byPlayer = {};

      for (const ev of events) {
        const playerId = Number(ev?.playerId);
        if (!Number.isFinite(playerId)) continue;

        if (!byPlayer[playerId]) {
          byPlayer[playerId] = {
            maxEV: null,
            longestHR: null,
            avgEV: null,
            avgDistance: null,
            _evTotal: 0,
            _evCount: 0,
            _distTotal: 0,
            _distCount: 0
          };
        }

        const launchSpeed = Number(ev?.launchSpeed);
        const distance = Number(ev?.distance);

        if (Number.isFinite(launchSpeed)) {
          byPlayer[playerId].maxEV =
            byPlayer[playerId].maxEV === null
              ? launchSpeed
              : Math.max(byPlayer[playerId].maxEV, launchSpeed);
          byPlayer[playerId]._evTotal += launchSpeed;
          byPlayer[playerId]._evCount += 1;
        }

        if (Number.isFinite(distance)) {
          byPlayer[playerId].longestHR =
            byPlayer[playerId].longestHR === null
              ? distance
              : Math.max(byPlayer[playerId].longestHR, distance);
          byPlayer[playerId]._distTotal += distance;
          byPlayer[playerId]._distCount += 1;
        }
      }

      Object.values(byPlayer).forEach(stats => {
        stats.avgEV = stats._evCount ? (stats._evTotal / stats._evCount) : null;
        stats.avgDistance = stats._distCount ? (stats._distTotal / stats._distCount) : null;
        delete stats._evTotal;
        delete stats._evCount;
        delete stats._distTotal;
        delete stats._distCount;
      });

      hrEventDataByPlayer = byPlayer;
    } catch (error) {
      console.error("Error loading HR event data:", error);
      hrEventDataByPlayer = {};
    } finally {
      hrEventDataLoadPromise = null;
    }
  })();

  await hrEventDataLoadPromise;
}

function tsOrdinal(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n}st`;
  if (mod10 === 2 && mod100 !== 12) return `${n}nd`;
  if (mod10 === 3 && mod100 !== 13) return `${n}rd`;
  return `${n}th`;
}

function tsBuildPlayerRow(teamName, p) {
  const playerId = p.id || p.playerId || null;
  const s = playerId ? (playerSeasonStats[playerId] || {}) : {};
  const hrx = playerId ? (hrEventDataByPlayer[playerId] || {}) : {};
  return {
    teamName,
    name: p.name,
    playerId,
    hr: Number(s.homeRuns || 0),
    rbi: Number(s.rbi || 0),
    runs: Number(s.runs || 0),
    avg: Number(s.avg || 0),
    obp: Number(s.obp || 0),
    slg: Number(s.slg || 0),
    ops: Number(s.ops || 0),
    gamesPlayed: Number(s.gamesPlayed || 0),
    atBats: Number(s.atBats || 0),
    avgDistance: Number.isFinite(hrx.avgDistance) ? hrx.avgDistance : null,
    avgEV: Number.isFinite(hrx.avgEV) ? hrx.avgEV : null,
    longestHR: Number.isFinite(hrx.longestHR) ? hrx.longestHR : null,
    maxEV: Number.isFinite(hrx.maxEV) ? hrx.maxEV : null
  };
}

function tsGetAllRows() {
  return fantasyTeams.flatMap(team => team.players.map(p => tsBuildPlayerRow(team.name, p)));
}

function tsGetTeamSummaries() {
  return fantasyTeams.map(team => {
    const rows = team.players.map(p => tsBuildPlayerRow(team.name, p));
    const teamHR = rows.reduce((s,r)=>s+r.hr,0);
    const top4 = rows.map(r=>r.hr).sort((a,b)=>b-a).slice(0,4).reduce((s,x)=>s+x,0);
    const avgTeamEV = tsAvg(rows.map(r=>r.avgEV));
    const avgTeamDistance = tsAvg(rows.map(r=>r.avgDistance));
    const avgSlg = tsAvg(rows.map(r=>r.slg));
    return { name: team.name, rows, teamHR, top4, avgTeamEV, avgTeamDistance, avgSlg };
  });
}

function tsCurrentPlaceLabel(teamName) {
  const teamsWithTotals = tsGetTeamSummaries().sort((a, b) => b.top4 - a.top4);
  let currentRank = 1;
  let i = 0;

  while (i < teamsWithTotals.length) {
    const currentTeam = teamsWithTotals[i];
    const tiedTeams = [currentTeam];
    let j = i + 1;

    while (j < teamsWithTotals.length && teamsWithTotals[j].top4 === currentTeam.top4) {
      tiedTeams.push(teamsWithTotals[j]);
      j++;
    }

    const suffix = getRankSuffix(currentRank);
    const label = tiedTeams.length > 1 ? `T-${currentRank}${suffix}` : `${currentRank}${suffix}`;

    if (tiedTeams.some(t => t.name === teamName)) {
      return label;
    }

    currentRank += tiedTeams.length;
    i = j;
  }

  return '—';
}

function tsLeagueRankText(metricKey, teamValue) {
  const summaries = tsGetTeamSummaries();
  const valueMap = {
    teamHR: 'teamHR',
    top4: 'top4',
    avgTeamEV: 'avgTeamEV',
    avgTeamDistance: 'avgTeamDistance',
    avgSlg: 'avgSlg'
  };
  const key = valueMap[metricKey];
  const values = summaries.map(x => x[key]).filter(v => Number.isFinite(v));
  const greaterCount = values.filter(v => v > teamValue).length;
  const tieCount = values.filter(v => v === teamValue).length;
  const rank = greaterCount + 1;
  return `${tieCount > 1 ? 'T-' : ''}${tsOrdinal(rank)} in League`;
}

function tsSortValue(row, key) {
  if (key === "name") return row.name || "";
  if (key === "teamName") return row.teamName || "";
  if (key === "abPerHr") return tsAbPerHr(row);
  if (key === "hrPace") return tsHrPace(row);
  return row[key];
}
function updateTeamStatsSortHeaders() {
  document.querySelectorAll(".ts-sortable").forEach(th => {
    th.classList.remove("active", "asc", "desc");
    if (th.dataset.sort === teamStatsSort.key) {
      th.classList.add("active", teamStatsSort.dir);
    }
  });
}

function tsRenderSimpleKpi(id, label, value, sub) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = `
    <div class="ts-kpi-lbl">${label}</div>
    <div class="ts-kpi-val">${value}</div>
    <div class="ts-kpi-sub">${sub}</div>
  `;
}

function tsRenderPlayerKpi(id, label, row, value, sub = "") {
  const el = document.getElementById(id);
  if (!el) return;
  if (!row) {
    el.innerHTML = `
      <div class="ts-kpi-lbl">${label}</div>
      <div class="ts-kpi-val">—</div>
      <div class="ts-kpi-sub">—</div>
    `;
    return;
  }
  el.innerHTML = `
    <div class="ts-kpi-lbl">${label}</div>
    <div class="ts-kpi-player-wrap">
      <img class="ts-kpi-headshot" src="${tsHeadshotUrl(row.playerId)}" alt="${row.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div class="ts-kpi-headshot ts-kpi-headshot-fallback" style="display:none;">${tsInitials(row.name)}</div>
      <div class="ts-kpi-name">${row.name}</div>
      <div class="ts-kpi-team">${row.teamName}</div>
    </div>
    <div class="ts-kpi-val">${value}</div>
    <div class="ts-kpi-sub">${sub}</div>
  `;
}

function renderTeamStats() {
  initTeamStatsUI();
  const sel = document.getElementById("ts-team-select");
  const mode = sel?.value || "league";
  const isLeague = mode === "league";
  const q = (document.getElementById("ts-search")?.value || "").trim().toLowerCase();
  const split = document.getElementById("ts-split");
  const leadersSection = document.getElementById("ts-leaders-section");
  const teamCol = document.getElementById("ts-col-team");
  const tableTitle = document.getElementById("ts-table-title");

  document.getElementById("ts-updated").textContent = "Updated: " + new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});

  let rows;
  let selectedTeam = null;

  if (isLeague) {
    document.getElementById("ts-selected-team").textContent = "League-Wide Stats";
    rows = tsGetAllRows();
    split?.classList.add("league-mode");
    if (leadersSection) leadersSection.style.display = "none";
    if (teamCol) teamCol.style.display = "table-cell";
    if (tableTitle) tableTitle.textContent = "League Players";
  } else {
    const teamIdx = Number(mode);
    selectedTeam = fantasyTeams[teamIdx];
    if (!selectedTeam) return;
    document.getElementById("ts-selected-team").textContent = selectedTeam.name;
    rows = selectedTeam.players.map(p => tsBuildPlayerRow(selectedTeam.name, p));
    split?.classList.remove("league-mode");
    if (leadersSection) leadersSection.style.display = "block";
    if (teamCol) teamCol.style.display = "none";
    if (tableTitle) tableTitle.textContent = "Players";
  }

  if (q) rows = rows.filter(r => r.name.toLowerCase().includes(q) || r.teamName.toLowerCase().includes(q));

  rows.sort((a, b) => {
    const av = tsSortValue(a, teamStatsSort.key);
    const bv = tsSortValue(b, teamStatsSort.key);
    const dir = teamStatsSort.dir === "asc" ? 1 : -1;
    if (teamStatsSort.key === "name" || teamStatsSort.key === "teamName") {
      return String(av).localeCompare(String(bv)) * dir;
    }
    const aNull = av === null || av === undefined || Number.isNaN(av);
    const bNull = bv === null || bv === undefined || Number.isNaN(bv);
    if (aNull && bNull) return 0;
    if (aNull) return 1;
    if (bNull) return -1;
    return (av - bv) * dir;
  });

  document.getElementById("ts-player-count").textContent = rows.length;
  updateTeamStatsSortHeaders();

  const tbody = document.getElementById("ts-tbody");
  tbody.innerHTML = rows.map(r => {
    const abPerHr = tsAbPerHr(r);
    const hrPace = tsHrPace(r);
    return `
      <tr>
        ${isLeague ? `<td>${r.teamName}</td>` : ""}
        <td>
          <div class="ts-player">
            <img class="ts-avatar ts-headshot" src="${tsHeadshotUrl(r.playerId)}" alt="${r.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="ts-avatar ts-avatar-fallback" style="display:none;">${tsInitials(r.name)}</div>
            <div>
              <div class="ts-name">${r.name}</div>
            </div>
          </div>
        </td>
        <td>${tsFmtInt(r.gamesPlayed)}</td>
        <td>${tsFmtInt(r.atBats)}</td>
        <td style="font-weight:900;">${tsFmtInt(r.hr)}</td>
        <td>${abPerHr !== null ? tsFmt1(abPerHr) : "—"}</td>
        <td>${hrPace !== null ? tsFmt1(hrPace) : "—"}</td>
        <td>${r.avgDistance !== null ? `${tsFmtInt(Math.round(r.avgDistance))} ft` : "—"}</td>
        <td>${r.longestHR !== null ? `${tsFmtInt(r.longestHR)} ft` : "—"}</td>
        <td>${r.avgEV !== null ? `${tsFmt1(r.avgEV)} MPH` : "—"}</td>
        <td>${r.maxEV !== null ? `${tsFmt1(r.maxEV)} MPH` : "—"}</td>
        <td>${tsFmt3(r.avg)}</td>
        <td>${tsFmtInt(r.rbi)}</td>
        <td>${tsFmtInt(r.runs)}</td>
        <td>${tsFmt3(r.obp)}</td>
        <td>${tsFmt3(r.slg)}</td>
        <td style="font-weight:900;">${tsFmt3(r.ops)}</td>
      </tr>`;
  }).join("");

  if (isLeague) {
    const summaries = tsGetTeamSummaries();
    const maxBy = (arr, fn) => arr.reduce((best, cur) => (fn(cur) > fn(best) ? cur : best), arr[0]);
    const validLongest = rows.filter(r => r.longestHR !== null);
    const validMaxEV = rows.filter(r => r.maxEV !== null);
    const validAbhr = rows.filter(r => tsAbPerHr(r) !== null);
    const validOps = rows.filter(r => Number.isFinite(r.ops) && r.ops > 0);
    const leagueLeaderTeam = summaries.length ? summaries.reduce((best, cur) => cur.top4 > best.top4 ? cur : best, summaries[0]) : null;
    const hrLeader = rows.length ? maxBy(rows, r => r.hr) : null;
    const furthestLeader = validLongest.length ? maxBy(validLongest, r => r.longestHR) : null;
    const maxEVLeader = validMaxEV.length ? maxBy(validMaxEV, r => r.maxEV) : null;
    const opsLeader = validOps.length ? maxBy(validOps, r => r.ops) : null;
    const abhrLeader = validAbhr.length ? validAbhr.reduce((best, cur) => tsAbPerHr(cur) < tsAbPerHr(best) ? cur : best, validAbhr[0]) : null;

    tsRenderSimpleKpi("ts-kpi-1", "League Leader", leagueLeaderTeam ? leagueLeaderTeam.name : "—", leagueLeaderTeam ? `${leagueLeaderTeam.top4} top 4 HR` : "—");
    tsRenderPlayerKpi("ts-kpi-2", "HR Leader", hrLeader, hrLeader ? `${tsFmtInt(hrLeader.hr)}` : "—", hrLeader ? `OPS ${tsFmt3(hrLeader.ops)}` : "—");
    tsRenderPlayerKpi("ts-kpi-3", "Furthest HR", furthestLeader, furthestLeader ? `${tsFmtInt(furthestLeader.longestHR)} ft` : "—", furthestLeader && furthestLeader.maxEV !== null ? `${tsFmt1(furthestLeader.maxEV)} MPH` : "—");
    tsRenderPlayerKpi("ts-kpi-4", "Highest EV HR", maxEVLeader, maxEVLeader ? `${tsFmt1(maxEVLeader.maxEV)} MPH` : "—", maxEVLeader && maxEVLeader.longestHR !== null ? `${tsFmtInt(maxEVLeader.longestHR)} ft` : "—");
    tsRenderPlayerKpi("ts-kpi-5", "OPS Leader", opsLeader, opsLeader ? `${tsFmt3(opsLeader.ops)}` : "—", opsLeader ? `${tsFmt3(opsLeader.slg)} SLG` : "—");
    tsRenderPlayerKpi("ts-kpi-6", "Best AB/HR", abhrLeader, abhrLeader ? `${tsFmt1(tsAbPerHr(abhrLeader))}` : "—", abhrLeader ? `${tsFmtInt(abhrLeader.hr)} HR` : "—");

    const leadersBox = document.getElementById("ts-leaders");
    if (leadersBox) leadersBox.innerHTML = "";
    return;
  }

  const teamHR = rows.reduce((s,r)=>s+r.hr,0);
  const top4 = rows.map(r=>r.hr).sort((a,b)=>b-a).slice(0,4).reduce((s,x)=>s+x,0);
  const avgTeamEV = tsAvg(rows.map(r=>r.avgEV));
  const avgTeamDistance = tsAvg(rows.map(r=>r.avgDistance));
  const avgSlg = tsAvg(rows.map(r=>r.slg));

  tsRenderSimpleKpi("ts-kpi-1", "Current Place", tsCurrentPlaceLabel(selectedTeam.name), "League Standing");
  tsRenderSimpleKpi("ts-kpi-2", "Total Team HR", teamHR, tsLeagueRankText("teamHR", teamHR));
  tsRenderSimpleKpi("ts-kpi-3", "Top 4 HR", top4, tsLeagueRankText("top4", top4));
  tsRenderSimpleKpi("ts-kpi-4", "Avg EV", avgTeamEV !== null ? `${avgTeamEV.toFixed(1)} MPH` : "—", avgTeamEV !== null ? tsLeagueRankText("avgTeamEV", avgTeamEV) : "—");
  tsRenderSimpleKpi("ts-kpi-5", "Avg Distance", avgTeamDistance !== null ? `${Math.round(avgTeamDistance)} ft` : "—", avgTeamDistance !== null ? tsLeagueRankText("avgTeamDistance", avgTeamDistance) : "—");
  tsRenderSimpleKpi("ts-kpi-6", "Avg Slugging", avgSlg !== null ? avgSlg.toFixed(3) : "—", avgSlg !== null ? tsLeagueRankText("avgSlg", avgSlg) : "—");

  const leadersBox = document.getElementById("ts-leaders");
  const maxBy = (arr, fn) => arr.reduce((best, cur) => (fn(cur) > fn(best) ? cur : best), arr[0]);
  if (!rows.length) { leadersBox.innerHTML = ''; return; }
  const hrLeader = maxBy(rows, r => r.hr);
  const opsLeader = maxBy(rows, r => r.ops);
  const abhrLeaderPool = rows.filter(r => tsAbPerHr(r) !== null);
  const paceLeaderPool = rows.filter(r => tsHrPace(r) !== null);
  const longestLeaderPool = rows.filter(r => r.longestHR !== null);
  const maxEVLeaderPool = rows.filter(r => r.maxEV !== null);
  const abhrLeader = abhrLeaderPool.length ? abhrLeaderPool.reduce((best, cur) => tsAbPerHr(cur) < tsAbPerHr(best) ? cur : best, abhrLeaderPool[0]) : null;
  const paceLeader = paceLeaderPool.length ? maxBy(paceLeaderPool, r => tsHrPace(r)) : null;
  const longestLeader = longestLeaderPool.length ? maxBy(longestLeaderPool, r => r.longestHR) : null;
  const maxEVLeader = maxEVLeaderPool.length ? maxBy(maxEVLeaderPool, r => r.maxEV) : null;
  const line = (title, r, value) => r ? `
    <div class="ts-leaderItem">
      <div class="ts-leaderLeft">
        <img class="ts-leaderHeadshot" src="${tsHeadshotUrl(r.playerId)}" alt="${r.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="ts-leaderHeadshot ts-leaderHeadshotFallback" style="display:none;">${tsInitials(r.name)}</div>
        <div class="left">
          <div class="ts-leaderTitle">${title}</div>
          <div class="ts-small ts-leaderName">${r.name}</div>
        </div>
      </div>
      <div class="right">${value}</div>
    </div>` : '';
  leadersBox.innerHTML = [
    line('HR Leader', hrLeader, `${hrLeader.hr}`),
    line('OPS Leader', opsLeader, opsLeader.ops ? opsLeader.ops.toFixed(3) : '—'),
    line('Longest HR', longestLeader, longestLeader ? `${tsFmtInt(longestLeader.longestHR)} ft` : '—'),
    line('Max EV', maxEVLeader, maxEVLeader ? `${tsFmt1(maxEVLeader.maxEV)} MPH` : '—'),
    line('Best AB/HR', abhrLeader, abhrLeader && tsAbPerHr(abhrLeader) ? tsAbPerHr(abhrLeader).toFixed(1) : '—'),
    line('HR Pace Leader', paceLeader, paceLeader && tsHrPace(paceLeader) ? tsHrPace(paceLeader).toFixed(1) : '—')
  ].join('');
}

document.getElementById("teamstats-tab")?.addEventListener("click", async () => {
  document.getElementById("team-container").style.display = "none";
  document.getElementById("monthly-container").style.display = "none";
  document.getElementById("feed-container").style.display = "none";
  document.getElementById("winnings-container").style.display = "none";
  document.getElementById("team-stats-container").style.display = "block";
  if (window.innerWidth <= 768) {
    document.getElementById("mobile-month-select").style.display = "none";
  }
  setActiveTabClass("teamstats-active");
  if (Object.keys(playerSeasonStats).length === 0) {
    await fetchPlayerStats();
  }
  await ensurePlayerTeamIdsLoaded();
  await ensureTeamGamesPlayedLoaded();
  await ensureHrEventDataLoaded();
  initTeamStatsUI();
  renderTeamStats();
});

populateMobileMonthDropdown();  // Ensure dropdown appears immediately
document.getElementById("mobile-month-select").addEventListener("change", handleMobileMonthChange);

// Initial fetch on load
(async function initApp() {
  try {
    await loadFantasyTeams();
    await fetchPlayerStats();
    setInterval(fetchPlayerStats, 300000);
    setInterval(fetchMonthlyStats, 300000);
  } catch (error) {
    console.error("App initialization failed:", error);
    const container = document.getElementById("team-container");
    if (container) {
      container.innerHTML = '<p style="padding:20px;">Failed to load fantasy rosters.</p>';
    }
  }
})();


function initSymbolKeyToggle() {
  const toggle = document.getElementById("symbol-key-toggle");
  const panel = document.getElementById("symbol-key-panel");
  const tools = document.getElementById("leaderboard-tools");
  if (!toggle || !panel || !tools) return;

  const closePanel = () => {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  };

  const openPanel = () => {
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
  };

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) closePanel();
    else openPanel();
  });

  document.addEventListener("click", (e) => {
    if (!tools.contains(e.target)) closePanel();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePanel();
  });
}


function initExpandAllTeamsButton() {
  const btn = document.getElementById("expand-all-teams-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const shouldExpand = !mobileLeaderboardExpandedAll;
    setAllMobileTeamsExpanded(shouldExpand);
    syncExpandAllTeamsButton();
    displayFantasyTeams();
  });

  syncExpandAllTeamsButton();
}

let mobileLeaderboardResizeTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(mobileLeaderboardResizeTimer);
  mobileLeaderboardResizeTimer = setTimeout(() => {
    syncExpandAllTeamsButton();
    if (document.getElementById("team-container")?.style.display !== "none") {
      displayFantasyTeams();
    }
  }, 120);
});

initExpandAllTeamsButton();

initSymbolKeyToggle();
