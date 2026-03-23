const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

// For now, use 2026 rosters as the placeholder source.
const ROSTER_FILE = path.join(ROOT, "data", "fantasy-rosters-2026.json");

// 2026 HR output file
const HR_DATA_FILE = path.join(ROOT, "data", "hr-events-2026.json");

const SEASON = 2026;
const DAYS_BACK = 7;

function loadJson(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file: ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function getAllRosterPlayers(rosterData) {
  if (!rosterData || !Array.isArray(rosterData.teams)) {
    throw new Error("Roster JSON must contain a teams array.");
  }

  const allPlayers = [];

  for (const team of rosterData.teams) {
    if (!Array.isArray(team.players)) continue;

    for (const player of team.players) {
      if (!player || typeof player.id !== "number") continue;

      allPlayers.push({
        fantasyTeam: team.name,
        name: player.name,
        id: player.id
      });
    }
  }

  return allPlayers;
}

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText} | ${url}`);
  }

  return response.json();
}

function formatDateLocal(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getRollingDateRange(daysBack) {
  const dates = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Include today + previous 6 days = 7 total days
  for (let i = daysBack - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(formatDateLocal(d));
  }

  return dates;
}

async function getGamePksForDate(dateStr) {
  const scheduleUrl = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${dateStr}&gameTypes=R`;
  const data = await fetchJson(scheduleUrl);

  const gamePks = [];

  for (const dateBlock of data.dates || []) {
    for (const game of dateBlock.games || []) {
      if (game && game.gamePk) {
        gamePks.push(game.gamePk);
      }
    }
  }

  return gamePks;
}

async function getFantasyHomeRunsForGame(gamePk, dateStr, playerMap) {
  const pbpUrl = `https://statsapi.mlb.com/api/v1/game/${gamePk}/playByPlay?events=home_run`;
  const data = await fetchJson(pbpUrl);

  const matchingEvents = [];

  for (const [playIndex, play] of (data.allPlays || []).entries()) {
    const hitter = play?.matchup?.batter;
    const eventType = play?.result?.eventType;

    if (eventType !== "home_run") continue;
    if (!hitter || !playerMap.has(hitter.id)) continue;

    const rosterPlayer = playerMap.get(hitter.id);
    const atBatIndex = play?.about?.atBatIndex ?? null;
    const eventKey = `${hitter.id}-${gamePk}-${atBatIndex}-${playIndex}`;

    const hitEvent = play?.playEvents?.find((event) => event?.hitData) || {};
    const hitData = hitEvent.hitData || {};

    matchingEvents.push({
      key: eventKey,
      season: SEASON,
      date: dateStr,
      gamePk,
      atBatIndex,
      playerId: hitter.id,
      playerName: rosterPlayer.name,
      fantasyTeam: rosterPlayer.fantasyTeam,
      distance: hitData.totalDistance || null,
      launchSpeed: hitData.launchSpeed || null,
      launchAngle: hitData.launchAngle || null
    });
  }

  return matchingEvents;
}

function mergeEvents(existingEvents, newEvents) {
  const merged = [...existingEvents];
  const seen = new Set(existingEvents.map((e) => e.key));

  for (const ev of newEvents) {
    if (!seen.has(ev.key)) {
      merged.push(ev);
      seen.add(ev.key);
    }
  }

  return merged;
}

async function main() {
  console.log("Starting rolling 7-day HR data updater...");

  const hrData = loadJson(HR_DATA_FILE);
  const rosterData = loadJson(ROSTER_FILE);

  if (!Array.isArray(hrData.events)) {
    throw new Error("HR data JSON must contain an events array.");
  }

  const allPlayers = getAllRosterPlayers(rosterData);
  const uniquePlayers = new Map();

  for (const player of allPlayers) {
    if (!uniquePlayers.has(player.id)) {
      uniquePlayers.set(player.id, player);
    }
  }

  const scanDates = getRollingDateRange(DAYS_BACK);

  console.log(`Teams found: ${rosterData.teams.length}`);
  console.log(`Players found: ${allPlayers.length}`);
  console.log(`Unique player IDs: ${uniquePlayers.size}`);
  console.log(`Scanning last ${DAYS_BACK} days: ${scanDates[0]} through ${scanDates[scanDates.length - 1]}`);

  let allNewEvents = [];
  let totalGamesScanned = 0;
  let totalGameFailures = 0;

  for (const dateStr of scanDates) {
    try {
      const gamePks = await getGamePksForDate(dateStr);
      totalGamesScanned += gamePks.length;

      console.log(`\n${dateStr} | Games found: ${gamePks.length}`);

      let dateEvents = [];

      for (const gamePk of gamePks) {
        try {
          const gameEvents = await getFantasyHomeRunsForGame(gamePk, dateStr, uniquePlayers);

          if (gameEvents.length > 0) {
            console.log(`  Game ${gamePk}: found ${gameEvents.length} fantasy HR event(s)`);
          }

          dateEvents.push(...gameEvents);
        } catch (error) {
          totalGameFailures += 1;
          console.error(`  Failed game ${gamePk}: ${error.message}`);
        }
      }

      console.log(`  Date total fantasy HR events: ${dateEvents.length}`);
      allNewEvents.push(...dateEvents);
    } catch (error) {
      console.error(`Failed date ${dateStr}: ${error.message}`);
    }
  }

  const beforeCount = hrData.events.length;
  hrData.events = mergeEvents(hrData.events, allNewEvents);
  const afterCount = hrData.events.length;
  const insertedCount = afterCount - beforeCount;

  hrData.updatedAt = new Date().toISOString();
  hrData.lastScanMode = "rolling-7-day";
  hrData.lastScanDates = scanDates;
  hrData.rosterSummary = {
    teamCount: rosterData.teams.length,
    playerCount: allPlayers.length,
    uniquePlayerIdCount: uniquePlayers.size
  };

  saveJson(HR_DATA_FILE, hrData);

  console.log("\n====================");
  console.log("Scan complete");
  console.log(`Total dates scanned: ${scanDates.length}`);
  console.log(`Total games scanned: ${totalGamesScanned}`);
  console.log(`Total failed games: ${totalGameFailures}`);
  console.log(`Events found this run: ${allNewEvents.length}`);
  console.log(`New unique events inserted: ${insertedCount}`);
  console.log(`Total stored events: ${hrData.events.length}`);
  console.log(`Updated ${HR_DATA_FILE}`);
}

main().catch((error) => {
  console.error("HR updater failed:");
  console.error(error);
  process.exit(1);
});