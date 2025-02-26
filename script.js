// Updated Fantasy Teams and Players
let fantasyTeams = [
  {
    name: "Dan/Connor",
    players: [
      { name: "Mike Trout" },
      { name: "Nolan Arenado" },
      { name: "Josh Jung" },
      { name: "Nolan Jones" },
      { name: "William Contreras" },
      { name: "Yainer Diaz" }
    ]
  },
  {
    name: "Pete/Zack",
    players: [
      { name: "Luis Robert Jr" },
      { name: "Corey Seager" },
      { name: "Eugenio Suarez" },
      { name: "Anthony Rizzo" },
      { name: "J.D. Martinez" },
      { name: "J.T. Realmuto" }
    ]
  },
  {
    name: "Payton/Matt",
    players: [
      { name: "Austin Riley" },
      { name: "Manny Machado" },
      { name: "Trea Turner" },
      { name: "Randy Arozarena" },
      { name: "Elly De La Cruz" },
      { name: "Daniel Vogelbach" }
    ]
  },
  {
    name: "John Eames",
    players: [
      { name: "Aaron Judge" },
      { name: "Teoscar Hernandez" },
      { name: "Oneil Cruz" },
      { name: "James Outman" },
      { name: "Spencer Steer" },
      { name: "Zack Gelof" }
    ]
  }
];

// Object to store season home run data (2024) by player
let playerHomeRuns = {};
// Object to store monthly home run data (season 2024) by player
let playerMonthlyStats = {};

// --- Season Totals Functions (Homepage) ---
async function fetchPlayerId(playerName) {
  try {
    const response = await fetch(`https://statsapi.mlb.com/api/v1/people/search?names=${playerName}`);
    const data = await response.json();
    const player = data.people?.[0];
    if (player) {
      return player.id;
    } else {
      console.warn(`Player not found: ${playerName}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching player ID for ${playerName}:`, error);
    return null;
  }
}

async function fetchSeasonHomeRuns(playerId) {
  try {
    const response = await fetch(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=season&season=2024`);
    const data = await response.json();
    if (data.stats && data.stats[0].splits) {
      return data.stats[0].splits[0].stat.homeRuns || 0;
    }
    return 0;
  } catch (error) {
    console.error(`Error fetching season home runs for player ${playerId}:`, error);
    return 0;
  }
}

async function fetchPlayerStats() {
  document.getElementById("loading-indicator").style.display = "flex";
  try {
    for (const team of fantasyTeams) {
      for (const player of team.players) {
        player.id = await fetchPlayerId(player.name);
      }
    }
    for (const team of fantasyTeams) {
      for (const player of team.players) {
        if (player.id) {
          const totalHomeRuns = await fetchSeasonHomeRuns(player.id);
          playerHomeRuns[player.id] = totalHomeRuns;
        }
      }
    }
    displayFantasyTeams();
    const now = new Date();
    document.getElementById("last-update").textContent = "Last updated: " + now.toLocaleString();
  } catch (error) {
    console.error("Error fetching player stats:", error);
  } finally {
    document.getElementById("loading-indicator").style.display = "none";
  }
}

function displayFantasyTeams() {
  const sortedTeams = fantasyTeams.slice().sort((teamA, teamB) => {
    const totalA = topFourTotal(teamA);
    const totalB = topFourTotal(teamB);
    return totalB - totalA;
  });

  let teamsHtml = "";
  sortedTeams.forEach((team, index) => {  // Use index for ranking
    let playersHtml = "";
    team.players.forEach(player => {
      const hr = playerHomeRuns[player.id] || 0;
      playersHtml += `<li>${player.name} - ${hr}</li>`;
    });
    const top4 = topFourTotal(team);
    teamsHtml += `
      <div class="team">
        <h2>${index + 1}. ${team.name}</h2>  <!-- Ranking added here -->
        <ul>${playersHtml}</ul>
        <div class="total-home-runs">
          <strong>Top 4 Total: ${top4}</strong>
        </div>
      </div>
    `;
  });
  document.getElementById("team-container").innerHTML = teamsHtml;
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
    const response = await fetch(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=gameLog&season=2024`);
    const data = await response.json();
    let monthlyStats = {};
    const monthMapping = {
      2: "March/April", // March (index 2)
      3: "March/April", // April (index 3)
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October"
    };
    // Initialize monthlyStats to 0 for each column
    Object.values(monthMapping).forEach(month => {
      monthlyStats[month] = 0;
    });
    if (data.stats && data.stats[0].splits && data.stats[0].splits.length > 0) {
      data.stats[0].splits.forEach(split => {
        const gameDate = new Date(split.date);
        const monthName = monthMapping[gameDate.getMonth()];
        if (monthName) {
          monthlyStats[monthName] += parseInt(split.stat.homeRuns, 10) || 0;
        }
      });
    }
    return monthlyStats;
  } catch (error) {
    console.error(`Error fetching monthly home runs for player ${playerId}:`, error);
    return {};
  }
}

async function fetchMonthlyStats() {
  document.getElementById("loading-indicator").style.display = "flex";
  try {
    for (const team of fantasyTeams) {
      for (const player of team.players) {
        if (!player.id) {
          player.id = await fetchPlayerId(player.name);
        }
      }
    }
    for (const team of fantasyTeams) {
      for (const player of team.players) {
        if (player.id) {
          playerMonthlyStats[player.id] = await fetchMonthlyHomeRuns(player.id);
        }
      }
    }
    displayMonthlyStats();
  } catch (error) {
    console.error("Error fetching monthly stats:", error);
  } finally {
    document.getElementById("loading-indicator").style.display = "none";
  }
}

// In the monthly totals, for each team and for each month,
// only the top 5 players' home run totals are summed.
function displayMonthlyStats() {
  const months = ["March/April", "May", "June", "July", "August", "September", "October"];
  
  let maxTotals = {};
  months.forEach(month => { maxTotals[month] = 0; });
  
  // Compute maximum top 5 total for each month across teams
  fantasyTeams.forEach(team => {
    months.forEach(month => {
      let totals = team.players.map(player => {
        let monthly = playerMonthlyStats[player.id] || {};
        return monthly[month] || 0;
      });
      totals.sort((a, b) => b - a);
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
                    months.forEach((month, index) => {
                      html += `<th onclick="sortMonthlyTable(${index + 1})" style="cursor: pointer;">${month} ⬍</th>`;
                    });
  html += `</tr></thead><tbody>`;
  
  fantasyTeams.forEach(team => {
    let row = `<tr><td>${team.name}</td>`;
    months.forEach(month => {
      let totals = team.players.map(player => {
        let monthly = playerMonthlyStats[player.id] || {};
        return monthly[month] || 0;
      });
      totals.sort((a, b) => b - a);
      let teamTotal = totals.slice(0, 5).reduce((sum, val) => sum + val, 0);
      
      // *** Modify this part to add yellow highlighting ***
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
  let isAscending = table.getAttribute("data-sort") !== columnIndex.toString();
  
  rows.sort((rowA, rowB) => {
    let a = parseInt(rowA.cells[columnIndex].textContent) || 0;
    let b = parseInt(rowB.cells[columnIndex].textContent) || 0;
    return isAscending ? a - b : b - a;
  });

  table.innerHTML = "";
  rows.forEach(row => table.appendChild(row));

  table.setAttribute("data-sort", isAscending ? columnIndex.toString() : "");
}


// --- Tab Switching Logic ---
document.getElementById("season-tab").addEventListener("click", () => {
  document.getElementById("team-container").style.display = "grid";
  document.getElementById("monthly-container").style.display = "none";
});
document.getElementById("monthly-tab").addEventListener("click", () => {
  document.getElementById("team-container").style.display = "none";
  document.getElementById("monthly-container").style.display = "block";
  fetchMonthlyStats();
});

// Initial fetch on load
fetchPlayerStats();
setInterval(fetchPlayerStats, 300000);
setInterval(fetchMonthlyStats, 300000);
