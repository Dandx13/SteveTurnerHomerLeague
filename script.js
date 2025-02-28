// Updated Fantasy Teams and Players
let fantasyTeams = [
  {
    name: "Adam",
    players: [
      { name: "Brandon Lowe", id: 664040 },
      { name: "Ronald Acuña Jr.", id: 660670 },
      { name: "Alex Bregman", id: 608324 },
      { name: "Trevor Story", id: 596115 },
      { name: "Francisco Lindor", id: 596019 },
      { name: "Bryce Harper", id: 547180 }
    ]
  },
  {
    name: "Antonio",
    players: [
      { name: "Seiya Suzuki", id: 673548 },
      { name: "Seth Brown", id: 664913 },
      { name: "Kyle Tucker", id: 663656 },
      { name: "Cody Bellinger", id: 641355 },
      { name: "Salvador Perez", id: 521692 },
      { name: "Freddie Freeman", id: 518692 }
    ]
  },
  {
    name: "Dan/Connor",
    players: [
      { name: "Josh Jung", id: 673962 },
      { name: "Yainer Diaz", id: 673237 },
      { name: "Nolan Jones", id: 666134 },
      { name: "William Contreras", id: 661388 },
      { name: "Nolan Arenado", id: 571448 },
      { name: "Mike Trout", id: 545361 }
    ]
  },
  {
    name: "Dan/Joe",
    players: [
      { name: "Joey Gallo", id: 608336 },
      { name: "Christian Encarnacion-Strand", id: 687952 },
      { name: "Rafael Devers", id: 646240 },
      { name: "Jorge Soler", id: 624585 },
      { name: "Byron Buxton", id: 621439 },
      { name: "Hunter Renfroe", id: 592669 }
    ]
  },
  {
    name: "Dan/Larry",
    players: [
      { name: "Andrew Vaughn", id: 683734 },
      { name: "Francisco Alvarez", id: 682626 },
      { name: "Spencer Torkelson", id: 679529 },
      { name: "Ryan Noda", id: 676116 },
      { name: "Fernando Tatis Jr.", id: 665487 },
      { name: "Max Kepler", id: 596146 }
    ]
  },
  {
    name: "Joe/Dan",
    players: [
      { name: "Eloy Jiménez", id: 650391 },
      { name: "Rowdy Tellez", id: 642133 },
      { name: "Vinnie Pasquantino", id: 686469 },
      { name: "Juan Soto", id: 665742 },
      { name: "Christian Yelich", id: 592885 },
      { name: "Giancarlo Stanton", id: 519317 }
    ]
  },
  {
    name: "John Eames",
    players: [
      { name: "James Outman", id: 681546 },
      { name: "Zack Gelof", id: 680869 },
      { name: "Spencer Steer", id: 668715 },
      { name: "Oneil Cruz", id: 665833 },
      { name: "Teoscar Hernández", id: 606192 },
      { name: "Aaron Judge", id: 592450 }
    ]
  },
  {
    name: "John Fournier",
    players: [
      { name: "Shohei Ohtani", id: 660271 },
      { name: "Rhys Hoskins", id: 656555 },
      { name: "Gleyber Torres", id: 650402 },
      { name: "Tyler O'Neill", id: 641933 },
      { name: "Mitch Haniger", id: 571745 },
      { name: "Marcus Semien", id: 543760 }
    ]
  },
  {
    name: "Larry/Dan",
    players: [
      { name: "Jordan Walker", id: 691023 },
      { name: "Anthony Volpe", id: 683011 },
      { name: "Julio Rodríguez", id: 677594 },
      { name: "Bryan Reynolds", id: 668804 },
      { name: "Christopher Morel", id: 666624 },
      { name: "Ozzie Albies", id: 645277 }
    ]
  },
  {
    name: "Mike/Evan/Nick",
    players: [
      { name: "Brandon Drury", id: 592273 },
      { name: "Chas McCormick", id: 676801 },
      { name: "Nelson Velázquez", id: 676369 },
      { name: "Isaac Paredes", id: 670623 },
      { name: "Jack Suwinski", id: 669261 },
      { name: "Marcell Ozuna", id: 542303 }
    ]
  },
  {
    name: "Nate/Steve",
    players: [
      { name: "Wyatt Langford", id: 694671 },
      { name: "Yordan Alvarez", id: 670541 },
      { name: "Nolan Gorman", id: 669357 },
      { name: "Jazz Chisholm Jr.", id: 665862 },
      { name: "Daulton Varsho", id: 662139 },
      { name: "Christian Walker", id: 572233 }
    ]
  },
  {
    name: "Nick",
    players: [
      { name: "Logan O'Hoppe", id: 681351 },
      { name: "Jake Burger", id: 669394 },
      { name: "Jose Siri", id: 642350 },
      { name: "Matt Olson", id: 621566 },
      { name: "Dansby Swanson", id: 621020 },
      { name: "Paul Goldschmidt", id: 502671 }
    ]
  },
  {
    name: "Pat T",
    players: [
      { name: "Bobby Witt Jr.", id: 677951 },
      { name: "Kerry Carpenter", id: 681481 },
      { name: "Triston Casas", id: 671213 },
      { name: "Will Smith", id: 669257 },
      { name: "Royce Lewis", id: 668904 },
      { name: "Brent Rooker", id: 667670 }
    ]
  },
  {
    name: "Paul/Ryan",
    players: [
      { name: "Bo Bichette", id: 666182 },
      { name: "Cal Raleigh", id: 663728 },
      { name: "Kyle Schwarber", id: 656941 },
      { name: "Yandy Díaz", id: 650490 },
      { name: "Josh Bell", id: 605137 },
      { name: "Nick Castellanos", id: 592206 }
    ]
  },
  {
    name: "Payton/Matt",
    players: [
      { name: "Daniel Vogelbach", id: 596129 },
      { name: "Elly De La Cruz", id: 682829 },
      { name: "Randy Arozarena", id: 668227 },
      { name: "Austin Riley", id: 663586 },
      { name: "Trea Turner", id: 607208 },
      { name: "Manny Machado", id: 592518 }
    ]
  },
  {
    name: "Ryan/Paul",
    players: [
      { name: "Adolis García", id: 666969 },
      { name: "Ryan Mountcastle", id: 663624 },
      { name: "Brandon Nimmo", id: 607043 },
      { name: "Ketel Marte", id: 606466 },
      { name: "Max Muncy", id: 571970 },
      { name: "George Springer", id: 543807 }
    ]
  },
  {
    name: "Steve/Nate",
    players: [
      { name: "James Wood", id: 695578 },
      { name: "Matt Chapman", id: 656305 },
      { name: "Willy Adames", id: 642715 },
      { name: "Ryan McMahon", id: 641857 },
      { name: "Pete Alonso", id: 624413 },
      { name: "José Ramírez", id: 608070 }
    ]
  },
  {
    name: "Tom",
    players: [
      { name: "Gunnar Henderson", id: 683002 },
      { name: "Corbin Carroll", id: 682998 },
      { name: "Michael Harris II", id: 671739 },
      { name: "Adley Rutschman", id: 668939 },
      { name: "Alec Bohm", id: 664761 },
      { name: "Mookie Betts", id: 605141 }
    ]
  },
  {
    name: "Tyler",
    players: [
      { name: "MJ Melendez", id: 669004 },
      { name: "Vladimir Guerrero Jr.", id: 665489 },
      { name: "Lane Thomas", id: 657041 },
      { name: "Anthony Santander", id: 623993 },
      { name: "Carlos Correa", id: 621043 },
      { name: "Jose Altuve", id: 514888 }
    ]
  },
  {
    name: "Zack/Pete",
    players: [
      { name: "J.D. Martinez", id: 502110 },
      { name: "Luis Robert Jr.", id: 673357 },
      { name: "Anthony Rizzo", id: 519203 },
      { name: "Corey Seager", id: 608369 },
      { name: "J.T. Realmuto", id: 592663 },
      { name: "Eugenio Suárez", id: 553993 }
    ]
  }
];

// Object to store season home run data (2024) by player
let playerHomeRuns = {};

// Object to store monthly home run data (season 2024) by player
let playerMonthlyStats = {};


// --- Season Totals Functions (Homepage) ---
const playerIdLookup = {
  "Brandon Lowe": 664040,
  "Ronald Acuña Jr.": 660670,
  "Alex Bregman": 608324,
  "Trevor Story": 596115,
  "Francisco Lindor": 596019,
  "Bryce Harper": 547180,
  "Seiya Suzuki": 673548,
  "Seth Brown": 664913,
  "Kyle Tucker": 663656,
  "Cody Bellinger": 641355,
  "Salvador Perez": 521692,
  "Freddie Freeman": 518692,
  "Josh Jung": 673962,
  "Yainer Diaz": 673237,
  "Nolan Jones": 666134,
  "William Contreras": 661388,
  "Nolan Arenado": 571448,
  "Mike Trout": 545361,
  "Joey Gallo": 608336,
  "Christian Encarnacion-Strand": 687952,
  "Rafael Devers": 646240,
  "Jorge Soler": 624585,
  "Byron Buxton": 621439,
  "Hunter Renfroe": 592669,
  "Andrew Vaughn": 683734,
  "Francisco Alvarez": 682626,
  "Spencer Torkelson": 679529,
  "Ryan Noda": 676116,
  "Fernando Tatis Jr.": 665487,
  "Max Kepler": 596146,
  "Eloy Jiménez": 650391,
  "Rowdy Tellez": 642133,
  "Vinnie Pasquantino": 686469,
  "Juan Soto": 665742,
  "Christian Yelich": 592885,
  "Giancarlo Stanton": 519317,
  "James Outman": 681546,
  "Zack Gelof": 680869,
  "Spencer Steer": 668715,
  "Oneil Cruz": 665833,
  "Teoscar Hernández": 606192,
  "Aaron Judge": 592450,
  "Shohei Ohtani": 660271,
  "Rhys Hoskins": 656555,
  "Gleyber Torres": 650402,
  "Tyler O'Neill": 641933,
  "Mitch Haniger": 571745,
  "Marcus Semien": 543760,
  "Jordan Walker": 691023,
  "Anthony Volpe": 683011,
  "Julio Rodríguez": 677594,
  "Bryan Reynolds": 668804,
  "Christopher Morel": 666624,
  "Ozzie Albies": 645277,
  "Brandon Drury": 592273,
  "Chas McCormick": 676801,
  "Nelson Velázquez": 676369,
  "Isaac Paredes": 670623,
  "Jack Suwinski": 669261,
  "Marcell Ozuna": 542303,
  "Wyatt Langford": 694671,
  "Yordan Alvarez": 670541,
  "Nolan Gorman": 669357,
  "Jazz Chisholm Jr.": 665862,
  "Daulton Varsho": 662139,
  "Christian Walker": 572233,
  "Logan O'Hoppe": 681351,
  "Jake Burger": 669394,
  "Jose Siri": 642350,
  "Matt Olson": 621566,
  "Dansby Swanson": 621020,
  "Paul Goldschmidt": 502671,
  "Bobby Witt Jr.": 677951,
  "Kerry Carpenter": 681481,
  "Triston Casas": 671213,
  "Will Smith": 669257,
  "Royce Lewis": 668904,
  "Brent Rooker": 667670,
  "Bo Bichette": 666182,
  "Cal Raleigh": 663728,
  "Kyle Schwarber": 656941,
  "Yandy Díaz": 650490,
  "Josh Bell": 605137,
  "Nick Castellanos": 592206,
  "Daniel Vogelbach": 596129,
  "Elly De La Cruz": 682829,
  "Randy Arozarena": 668227,
  "Austin Riley": 663586,
  "Trea Turner": 607208,
  "Manny Machado": 592518,
  "Adolis García": 666969,
  "Ryan Mountcastle": 663624,
  "Brandon Nimmo": 607043,
  "Ketel Marte": 606466,
  "Max Muncy": 571970,
  "George Springer": 543807,
  "James Wood": 695578,
  "Matt Chapman": 656305,
  "Willy Adames": 642715,
  "Ryan McMahon": 641857,
  "Pete Alonso": 624413,
  "José Ramírez": 608070,
  "Gunnar Henderson": 683002,
  "Corbin Carroll": 682998,
  "Michael Harris II": 671739,
  "Adley Rutschman": 668939,
  "Alec Bohm": 664761,
  "Mookie Betts": 605141,
  "MJ Melendez": 669004,
  "Vladimir Guerrero Jr.": 665489,
  "Lane Thomas": 657041,
  "Anthony Santander": 623993,
  "Carlos Correa": 621043,
  "Jose Altuve": 514888,
  "J.D. Martinez": 502110,
  "Luis Robert Jr.": 673357,
  "Anthony Rizzo": 519203,
  "Corey Seager": 608369,
  "J.T. Realmuto": 592663,
  "Eugenio Suárez": 553993
};



function fetchPlayerId(playerName) {
  return playerIdLookup[playerName] || null;
}



async function fetchSeasonHomeRuns(playerId) {
  try {
    const response = await fetch(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=season&season=2024&group=hitting`);
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
  setTimeout(() => {
    document.getElementById("loading-indicator").style.display = "flex";
  }, 100); // ✅ Delay for a smoother user experience
  
document.getElementById("team-container").innerHTML = "<p>Loading teams...</p>"; // Show something right away

  try {
    let cachedPlayerIds = {}; // Store player IDs in memory

for (const team of fantasyTeams) {
  for (const player of team.players) {
    if (!cachedPlayerIds[player.name]) {
      player.id = await fetchPlayerId(player.name);
      cachedPlayerIds[player.name] = player.id; // Cache it
    } else {
      player.id = cachedPlayerIds[player.name]; // Use cached ID
    }
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
    const response = await fetch(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=gameLog&season=2024&group=hitting`);
    const data = await response.json();
    let monthlyStats = {};
    const monthMapping = {
      2: "March/April",
      3: "March/April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September"
    };
    // Initialize monthlyStats to 0 for each column
    Object.values(monthMapping).forEach(month => {
      monthlyStats[month] = 0;
    });
    if (data.stats && data.stats[0].splits && data.stats[0].splits.length > 0) {
      data.stats[0].splits.forEach(split => {
        const gameDate = new Date(split.date);
const monthName = monthMapping[gameDate.getUTCMonth()]; // ✅ Use getUTCMonth() to prevent time zone shift

        let gameHR = parseInt(split.stat.homeRuns, 10) || 0;
    
        if (monthName) {
          monthlyStats[monthName] += gameHR;
        
          // ✅ Log all players who hit at least 1 HR in a game
          if (gameHR > 0) {  
            console.log(`HR Game - Player ID: ${playerId}, Date: ${split.date}, Month: ${monthName}, HR: ${gameHR}`);
          }
        
          // ✅ NEW: Log the updated total after adding this game's HRs
          console.log(`Updating Monthly Stats - Player: ${playerId}, Month: ${monthName}, HR: ${gameHR}, Total in Month: ${monthlyStats[monthName]}`);
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

  // Clear existing options (in case this is called again)
  selectEl.innerHTML = '<option value="">-- Select a Month --</option>';

  months.forEach(month => {
    const opt = document.createElement("option");
    opt.value = month;
    opt.textContent = month;
    selectEl.appendChild(opt);
  });

  console.log("Mobile dropdown populated!"); // Debugging
}
  // Function to populate the dropdown menu with available months
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


  // Ensure the container is visible when a month is selected
  mobileContainer.style.display = "block";

  // Start building a mini-table
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

  // Loop through teams and calculate their top 5 HR totals for this month
  fantasyTeams.forEach(team => {
    let totals = team.players.map(player => {
      let monthlyData = playerMonthlyStats[player.id] || {};
      return monthlyData[selectedMonth] || 0;
    });

    totals.sort((a, b) => b - a);
    const top5Sum = totals.slice(0, 5).reduce((sum, val) => sum + val, 0);

    html += `
      <tr>
        <td>${team.name}</td>
        <td>${top5Sum}</td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  mobileContainer.innerHTML = html; // Inject the new table into the page
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

      // Log the HR totals before sorting
      console.log(`Before sorting - ${team.name} (${month}):`, totals);

      // Ensure all values are valid numbers
      totals = totals.filter(num => typeof num === "number" && !isNaN(num)); 

      // Sort from highest to lowest
      totals.sort((a, b) => b - a);

      // Log the sorted values
      console.log(`After sorting - ${team.name} (${month}):`, totals);

      // Sum only the top 5 values
      let teamTotal = totals.slice(0, 5).reduce((sum, val) => sum + val, 0);

      // Log the final computed total
      console.log(`Final total - ${team.name} (${month}):`, teamTotal);

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

  // Ensure dropdown is visible
  document.getElementById("mobile-month-select").style.display = "block";

  // Fetch stats and update the monthly table
  fetchMonthlyStats();
});


populateMobileMonthDropdown();  // Ensure dropdown appears immediately
document.getElementById("mobile-month-select").addEventListener("change", handleMobileMonthChange);



// Initial fetch on load
fetchPlayerStats();
setInterval(fetchPlayerStats, 600000);
setInterval(fetchMonthlyStats, 600000);
