// Updated Fantasy Teams and Players
let fantasyTeams = [
  {
    name: "Adam",
    players: [
      { name: "Fernando Tatis Jr.", id: 665487 },
      { name: "Julio Rodríguez", id: 677594 },
      { name: "Ronald Acuña Jr.", id: 660670 },
      { name: "Trea Turner", id: 607208 },
      { name: "Jesús Sánchez", id: 660821 },
      { name: "Carlos Santana", id: 467793 }
    ]
  },
  {
    name: "Antonio",
    players: [
      { name: "Anthony Santander", id: 623993 },
      { name: "Tyler O'Neill", id: 641933 },
      { name: "Cody Bellinger", id: 641355 },
      { name: "Seiya Suzuki", id: 673548 },
      { name: "Andrew Vaughn", id: 683734 },
      { name: "Yandy Díaz", id: 650490 }
    ]
  },
  {
    name: "Austin T",
    players: [
      { name: "Kyle Tucker", id: 663656 },
      { name: "Mark Vientos", id: 668901 },
      { name: "Isaac Paredes", id: 670623 },
      { name: "Marcus Semien", id: 543760 },
      { name: "Daulton Varsho", id: 662139 },
      { name: "Jasson Domínguez", id: 691176 }
    ]
  },
  {
    name: "Dan/Connor",
    players: [
      { name: "Shohei Ohtani", id: 660271 },
      { name: "Paul Goldschmidt", id: 502671 },
      { name: "Riley Greene", id: 682985 },
      { name: "Taylor Ward", id: 621493 },
      { name: "Josh Jung", id: 673962 },
      { name: "Jeremy Peña", id: 665161 }
    ]
  },
  {
    name: "Dan/Connor (2)",
    players: [
      { name: "Cal Raleigh", id: 663728 },
      { name: "Corey Seager", id: 608369 },
      { name: "Jordan Westburg", id: 676059 },
      { name: "Matt Wallner", id: 670242 },
      { name: "Carlos Correa", id: 621043 },
      { name: "MJ Melendez", id: 669004 }
    ]
  },
  {
    name: "Dan/Joe",
    players: [
      { name: "Matt Olson", id: 621566 },
      { name: "Michael Toglia", id: 669911 },
      { name: "Jazz Chisholm Jr.", id: 665862 },
      { name: "Christian Yelich", id: 592885 },
      { name: "Nolan Arenado", id: 571448 },
      { name: "Jeimer Candelario", id: 600869 }
    ]
  },
  {
    name: "Dan/Joe (2)",
    players: [
      { name: "Yordan Alvarez", id: 670541 },
      { name: "Oneil Cruz", id: 665833 },
      { name: "Vinnie Pasquantino", id: 686469 },
      { name: "William Contreras", id: 661388 },
      { name: "Tyler Soderstrom", id: 691016 },
      { name: "Pete Crow-Armstrong", id: 691718 }
    ]
  },
  {
    name: "Dan/Larry",
    players: [
      { name: "Aaron Judge", id: 592450 },
      { name: "Royce Lewis", id: 668904 },
      { name: "Shea Langeliers", id: 669127 },
      { name: "Nolan Gorman", id: 669357 },
      { name: "Ryan McMahon", id: 641857 },
      { name: "Jurickson Profar", id: 595777 }
    ]
  },
  {
    name: "Dan/Larry (2)",
    players: [
      { name: "Kyle Schwarber", id: 656941 },
      { name: "Luis Robert Jr.", id: 673357 },
      { name: "Byron Buxton", id: 621439 },
      { name: "Randy Arozarena", id: 668227 },
      { name: "Yainer Diaz", id: 673237 },
      { name: "Kris Bryant", id: 592178 }
    ]
  },
  {
    name: "John Eames",
    players: [
      { name: "Mike Trout", id: 545361 },
      { name: "Elly De La Cruz", id: 682829 },
      { name: "Colton Cowser", id: 681297 },
      { name: "Ian Happ", id: 664023 },
      { name: "Michael Busch", id: 683737 },
      { name: "Connor Norby", id: 681393 }
    ]
  },
  {
    name: "John Fournier",
    players: [
      { name: "Jake Burger", id: 669394 },
      { name: "Francisco Lindor", id: 596019 },
      { name: "James Wood", id: 695578 },
      { name: "Max Kepler", id: 596146 },
      { name: "Brenton Doyle", id: 686668 },
      { name: "Luke Raley", id: 670042 }
    ]
  },
  {
    name: "Mike/Nick/Evan",
    players: [
      { name: "Juan Soto", id: 665742 },
      { name: "Eugenio Suárez", id: 553993 },
      { name: "Joc Pederson", id: 592626 },
      { name: "JJ Bleday", id: 668709 },
      { name: "Spencer Torkelson", id: 679529 },
      { name: "Jake Cronenworth", id: 630105 }
    ]
  },
  {
    name: "Mike/Nick/Evan (2)",
    players: [
      { name: "Kerry Carpenter", id: 681481 },
      { name: "Rhys Hoskins", id: 656555 },
      { name: "Max Muncy", id: 571970 },
      { name: "Christian Encarnacion-Strand", id: 687952 },
      { name: "Kyle Manzardo", id: 700932 },
      { name: "Lourdes Gurriel Jr.", id: 666971 }
    ]
  },
  {
    name: "Nate",
    players: [
      { name: "Brent Rooker", id: 667670 },
      { name: "Triston Casas", id: 671213 },
      { name: "Jackson Chourio", id: 694192 },
      { name: "Ozzie Albies", id: 645277 },
      { name: "Jhonkensy Noel", id: 678877 },
      { name: "Deyvison De Los Santos", id: 691277 }
    ]
  },
  {
    name: "Nate (2)",
    players: [
      { name: "Gunnar Henderson", id: 683002 },
      { name: "Teoscar Hernández", id: 606192 },
      { name: "Heliot Ramos", id: 671218 },
      { name: "Matt McLain", id: 680574 },
      { name: "CJ Abrams", id: 682928 },
      { name: "Matt Shaw", id: 807713 }
    ]
  },
  {
    name: "Nick",
    players: [
      { name: "Marcell Ozuna", id: 542303 },
      { name: "Willy Adames", id: 642715 },
      { name: "Brandon Lowe", id: 664040 },
      { name: "Logan O'Hoppe", id: 681351 },
      { name: "Bo Bichette", id: 666182 },
      { name: "Tyler Fitzgerald", id: 666149 }
    ]
  },
  {
    name: "Pat T",
    players: [
      { name: "Rafael Devers", id: 646240 },
      { name: "Christian Walker", id: 572233 },
      { name: "Salvador Perez", id: 521692 },
      { name: "Michael Harris II", id: 671739 },
      { name: "George Springer", id: 543807 },
      { name: "Lars Nootbaar", id: 663457 }
    ]
  },
  {
    name: "Payton/Matt",
    players: [
      { name: "José Ramírez", id: 608070 },
      { name: "Adolis García", id: 666969 },
      { name: "Nick Castellanos", id: 592206 },
      { name: "Gleyber Torres", id: 650402 },
      { name: "Jose Altuve", id: 514888 },
      { name: "Kristian Campbell", id: 692225 }
    ]
  },
  {
    name: "Pete/Zack",
    players: [
      { name: "Pete Alonso", id: 624413 },
      { name: "Josh Naylor", id: 647304 },
      { name: "Corbin Carroll", id: 682998 },
      { name: "Austin Wells", id: 669224 },
      { name: "Adley Rutschman", id: 668939 },
      { name: "Anthony Volpe", id: 683011 }
    ]
  },
  {
    name: "Peyton B",
    players: [
      { name: "Bryce Harper", id: 547180 },
      { name: "Lawrence Butler", id: 671732 },
      { name: "Willson Contreras", id: 575929 },
      { name: "Ezequiel Tovar", id: 678662 },
      { name: "Jo Adell", id: 666176 },
      { name: "Ryan Jeffers", id: 680777 }
    ]
  },
  {
    name: "Ryan/Paul",
    players: [
      { name: "Austin Riley", id: 663586 },
      { name: "Ketel Marte", id: 606466 },
      { name: "Junior Caminero", id: 691406 },
      { name: "Jose Siri", id: 642350 },
      { name: "Ryan Mountcastle", id: 663624 },
      { name: "Cedric Mullins", id: 656775 }
    ]
  },
  {
    name: "Ryan/Paul (2)",
    players: [
      { name: "Matt Chapman", id: 656305 },
      { name: "Jorge Soler", id: 624585 },
      { name: "Christopher Morel", id: 666624 },
      { name: "Bryan Reynolds", id: 668804 },
      { name: "Alec Bohm", id: 664761 },
      { name: "Josh Bell", id: 605137 }
    ]
  },
  {
    name: "Tom/Ryan",
    players: [
      { name: "Bobby Witt Jr.", id: 677951 },
      { name: "Jackson Merrill", id: 701538 },
      { name: "Freddie Freeman", id: 518692 },
      { name: "Brandon Nimmo", id: 607043 },
      { name: "Lane Thomas", id: 657041 },
      { name: "Nathaniel Lowe", id: 663993 }
    ]
  },
  {
    name: "Tom/Ryan (2)",
    players: [
      { name: "Mookie Betts", id: 605141 },
      { name: "Alex Bregman", id: 608324 },
      { name: "Wyatt Langford", id: 694671 },
      { name: "Michael Conforto", id: 624424 },
      { name: "Dansby Swanson", id: 621020 },
      { name: "Zach Neto", id: 687263 }
    ]
  },
  {
    name: "Tyler",
    players: [
      { name: "Vladimir Guerrero Jr.", id: 665489 },
      { name: "Manny Machado", id: 592518 },
      { name: "Trevor Story", id: 596115 },
      { name: "Jarren Duran", id: 680776 },
      { name: "Will Smith", id: 669257 },
      { name: "Wilyer Abreu", id: 677800 }
    ]
  }
];

// Object to store season home run data (2024) by player
let playerHomeRuns = {};

// Object to store monthly home run data (season 2024) by player
let playerMonthlyStats = {};

// =========================
// Season & Team Stats caches
// =========================
const CURRENT_SEASON = 2025;
const playerSeasonStats = {};
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
    const desc = (t?.description || '').toLowerCase();
    const typeDesc = (t?.typeDesc || '').toLowerCase();
    const activated = desc.includes('activated from injured list') || desc.includes('returned from injured list') || desc.includes('reinstated from injured list') || desc.includes('activated') || typeDesc.includes('activated');
    if (activated) return false;
    const placedIL = (desc.includes('placed on') && desc.includes('injured list')) || desc.includes('transferred to the 60-day injured list') || desc.includes('10-day injured list') || desc.includes('15-day injured list') || desc.includes('60-day injured list') || typeDesc.includes('injured');
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

  let teamsHtml = "";
  sortedTeams.forEach((team, index) => {  // Use index for ranking
    let playersHtml = "";

    // Sort players within the team by home runs (most to least)
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

    // Assign class for top 3 teams (gold, silver, bronze)
    let teamClass = "";
    const actualRank = actualRanks[index];
    if (actualRank === 1) teamClass = "gold";
    else if (actualRank === 2) teamClass = "silver";
    else if (actualRank === 3) teamClass = "bronze";

    teamsHtml += `
    <div class="col-md-3 col-6">
        <div class="team ${teamClass}">
            <h3 class="team-rank">${rankLabels[index]}</h3> <!-- Ranking displayed here -->
            <h2>${team.name}</h2> <!-- Team name below the ranking -->
            <ul>${playersHtml}</ul>
            <div class="total-home-runs">
                <strong>Top 4 Total: ${top4}</strong>
            </div>
        </div>
    </div>
`;
  });

  const container = document.getElementById("team-container");
  container.style.visibility = "hidden"; // Hide container while updating
  container.innerHTML = teamsHtml;
  container.style.visibility = "visible"; // Show container after update
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



// =========================
// Team Stats tab
// =========================
let teamStatsUIInitialized = false;
let teamStatsSort = { key: "hr", dir: "desc" };

function initTeamStatsUI() {
  if (teamStatsUIInitialized) return;
  const sel = document.getElementById("ts-team-select");
  if (!sel) return;
  sel.innerHTML = fantasyTeams.map((t, i) => `<option value="${i}">${t.name}</option>`).join("");
  sel.value = "0";
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
        teamStatsSort.dir = key === "name" ? "asc" : "desc";
      }
      renderTeamStats();
    });
  });
  teamStatsUIInitialized = true;
}
function tsInitials(name) {
  const parts = String(name || "").replace(".", "").split(" ").filter(Boolean);
  const a = parts[0]?.[0] || "P";
  const b = parts[parts.length - 1]?.[0] || "X";
  return (a + b).toUpperCase();
}
function tsAvg(arr) {
  const nums = arr.filter(n => Number.isFinite(n));
  return nums.length ? nums.reduce((a,b)=>a+b,0)/nums.length : 0;
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
  return (r.hr / r.gamesPlayed) * 162;
}

function tsOrdinal(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n}st`;
  if (mod10 === 2 && mod100 !== 12) return `${n}nd`;
  if (mod10 === 3 && mod100 !== 13) return `${n}rd`;
  return `${n}th`;
}
function tsLeagueRankText(metricKey, teamValue) {
  const summaries = fantasyTeams.map(team => {
    const roster = team.players.map(p => {
      const playerId = p.id || p.playerId || null;
      const s = playerId ? (playerSeasonStats[playerId] || {}) : {};
      return {
        hr: Number(s.homeRuns || 0),
        rbi: Number(s.rbi || 0),
        avg: Number(s.avg || 0),
        ops: Number(s.ops || 0)
      };
    });
    const teamHR = roster.reduce((sum, r) => sum + r.hr, 0);
    const top4 = roster.map(r => r.hr).sort((a,b)=>b-a).slice(0,4).reduce((sum, x) => sum + x, 0);
    const teamRbi = roster.reduce((sum, r) => sum + r.rbi, 0);
    const avgOps = tsAvg(roster.map(r => r.ops));
    const avgAvg = tsAvg(roster.map(r => r.avg));
    return { teamHR, top4, teamRbi, avgOps, avgAvg };
  });

  const valueMap = {
    teamHR: 'teamHR',
    top4: 'top4',
    teamRbi: 'teamRbi',
    avgOps: 'avgOps',
    avgAvg: 'avgAvg'
  };
  const key = valueMap[metricKey];
  const values = summaries.map(x => Number(x[key] || 0));
  const greaterCount = values.filter(v => v > teamValue).length;
  const tieCount = values.filter(v => v === teamValue).length;
  const rank = greaterCount + 1;
  return `${tieCount > 1 ? 'T-' : ''}${tsOrdinal(rank)} in League`;
}

function tsSortValue(row, key) {
  if (key === "name") return row.name || "";
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
function renderTeamStats() {
  initTeamStatsUI();
  const sel = document.getElementById("ts-team-select");
  const teamIdx = Number(sel?.value || 0);
  const team = fantasyTeams[teamIdx];
  if (!team) return;
  document.getElementById("ts-selected-team").textContent = team.name;
  document.getElementById("ts-updated").textContent = "Updated: " + new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  const q = (document.getElementById("ts-search")?.value || "").trim().toLowerCase();

  let rows = team.players.map(p => {
    const playerId = p.id || p.playerId || null;
    const s = playerId ? (playerSeasonStats[playerId] || {}) : {};
    return {
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
      atBats: Number(s.atBats || 0)
    };
  });
  if (q) rows = rows.filter(r => r.name.toLowerCase().includes(q));

  rows.sort((a, b) => {
    const av = tsSortValue(a, teamStatsSort.key);
    const bv = tsSortValue(b, teamStatsSort.key);
    const dir = teamStatsSort.dir === "asc" ? 1 : -1;
    if (teamStatsSort.key === "name") {
      return String(av).localeCompare(String(bv)) * dir;
    }
    const aNull = av === null || av === undefined || Number.isNaN(av);
    const bNull = bv === null || bv === undefined || Number.isNaN(bv);
    if (aNull && bNull) return 0;
    if (aNull) return 1;
    if (bNull) return -1;
    return (av - bv) * dir;
  });

  const teamHR = rows.reduce((s,r)=>s+r.hr,0);
  const top4 = rows.map(r=>r.hr).sort((a,b)=>b-a).slice(0,4).reduce((s,x)=>s+x,0);
  const teamRbi = rows.reduce((s,r)=>s+r.rbi,0);
  const avgOps = tsAvg(rows.map(r=>r.ops));
  const avgAvg = tsAvg(rows.map(r=>r.avg));

  document.getElementById("ts-kpi-team-hr").textContent = teamHR;
  document.getElementById("ts-kpi-top4-hr").textContent = top4;
  document.getElementById("ts-kpi-rbi").textContent = teamRbi;
  document.getElementById("ts-kpi-ops").textContent = avgOps ? avgOps.toFixed(3) : "—";
  document.getElementById("ts-kpi-avg").textContent = avgAvg ? avgAvg.toFixed(3) : "—";

  document.getElementById("ts-kpi-team-hr-rank").textContent = tsLeagueRankText("teamHR", teamHR);
  document.getElementById("ts-kpi-top4-hr-rank").textContent = tsLeagueRankText("top4", top4);
  document.getElementById("ts-kpi-rbi-rank").textContent = tsLeagueRankText("teamRbi", teamRbi);
  document.getElementById("ts-kpi-ops-rank").textContent = tsLeagueRankText("avgOps", avgOps);
  document.getElementById("ts-kpi-avg-rank").textContent = tsLeagueRankText("avgAvg", avgAvg);

  document.getElementById("ts-player-count").textContent = rows.length;
  updateTeamStatsSortHeaders();

  const tbody = document.getElementById("ts-tbody");
  tbody.innerHTML = rows.map(r => {
    const abPerHr = tsAbPerHr(r);
    const hrPace = tsHrPace(r);
    return `
      <tr>
        <td>
          <div class="ts-player">
            <div class="ts-avatar">${tsInitials(r.name)}</div>
            <div>
              <div class="ts-name">${r.name}</div>
              <div class="ts-meta2">MLBAM: ${r.playerId || "—"}</div>
            </div>
          </div>
        </td>
        <td>${tsFmtInt(r.gamesPlayed)}</td>
        <td>${tsFmtInt(r.atBats)}</td>
        <td style="font-weight:900;">${tsFmtInt(r.hr)}</td>
        <td>${tsFmtInt(r.rbi)}</td>
        <td>${tsFmtInt(r.runs)}</td>
        <td>${tsFmt3(r.avg)}</td>
        <td>${tsFmt3(r.obp)}</td>
        <td>${tsFmt3(r.slg)}</td>
        <td style="font-weight:900;">${tsFmt3(r.ops)}</td>
        <td>${abPerHr ? tsFmt1(abPerHr) : "—"}</td>
        <td>${hrPace ? tsFmt1(hrPace) : "—"}</td>
      </tr>`;
  }).join("");

  const leadersBox = document.getElementById("ts-leaders");
  const maxBy = (arr, fn) => arr.reduce((best, cur) => (fn(cur) > fn(best) ? cur : best), arr[0]);
  if (!rows.length) { leadersBox.innerHTML = ''; return; }
  const hrLeader = maxBy(rows, r => r.hr);
  const opsLeader = maxBy(rows, r => r.ops);
  const abhrLeaderPool = rows.filter(r => tsAbPerHr(r) !== null);
  const paceLeaderPool = rows.filter(r => tsHrPace(r) !== null);
  const abhrLeader = abhrLeaderPool.length ? abhrLeaderPool.reduce((best, cur) => tsAbPerHr(cur) < tsAbPerHr(best) ? cur : best, abhrLeaderPool[0]) : null;
  const paceLeader = paceLeaderPool.length ? maxBy(paceLeaderPool, r => tsHrPace(r)) : null;
  const line = (title, r, value) => r ? `<div class="ts-leaderItem"><div class="left"><div style="font-weight:900;">${title}</div><div class="ts-small">${r.name}</div></div><div class="right">${value}</div></div>` : '';
  leadersBox.innerHTML = [
    line('HR Leader', hrLeader, `${hrLeader.hr}`),
    line('OPS Leader', opsLeader, opsLeader.ops ? opsLeader.ops.toFixed(3) : '—'),
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
  initTeamStatsUI();
  renderTeamStats();
});
populateMobileMonthDropdown();  // Ensure dropdown appears immediately
document.getElementById("mobile-month-select").addEventListener("change", handleMobileMonthChange);

// Initial fetch on load
fetchPlayerStats();
setInterval(fetchPlayerStats, 300000);
setInterval(fetchMonthlyStats, 300000);
