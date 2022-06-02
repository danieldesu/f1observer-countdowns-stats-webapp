//  Timers
//
// Event information
let weekendName = "Azerbaijan";
let weekendQualifying = "June 11, 2022 14:00:00 UTC+0";
// If no sprint coming, leave date empty and it won't be displayed
let weekendSprint = "";
let weekendRace = "June 12, 2022 11:00:00 UTC+0";

// Race weekend location
const weekendLocation = document.querySelector("#countdowns-event");
weekendLocation.innerText = `${weekendName} Grand Prix`;

// Target times for the events
const qualifyingTarget = new Date(weekendQualifying).getTime();
const sprintTarget = new Date(weekendSprint).getTime();
const raceTarget = new Date(weekendRace).getTime();

// Setting up Qualifying timer
let qualifyingTimer = setInterval(function () {
  let now = new Date().getTime();
  let t = qualifyingTarget - now;

  if (t >= 0) {
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    let secs = Math.floor((t % (1000 * 60)) / 1000);

    document.getElementById(
      "qualifying-days"
    ).innerHTML = `<span class="timer-number">${days}</span> days`;

    document.getElementById(
      "qualifying-hours"
    ).innerHTML = `<span class="timer-number">${("0" + hours).slice(
      -2
    )}</span> hours`;

    document.getElementById(
      "qualifying-mins"
    ).innerHTML = `<span class="timer-number">${("0" + mins).slice(
      -2
    )}</span> minutes`;

    document.getElementById(
      "qualifying-secs"
    ).innerHTML = `<span class="timer-number">${("0" + secs).slice(
      -2
    )}</span> seconds`;
  } else {
    document.getElementById("qualifying-countdown").innerHTML =
      "Countdown's over!";
  }
}, 1000);

// Setting up Sprint timer, Sprint timer only exists if there is a sprint event set

if (sprintTarget) {
  //only showing sprintHeader if it does in fact exist and is counted towards
  const sprintHeader = document.querySelector(
    ".sprint-countdown #countdown-header"
  );
  sprintHeader.innerText = "Sprint in:";

  let sprintTimer = setInterval(function () {
    let now = new Date().getTime();
    let t = sprintTarget - now;

    if (t >= 0) {
      let days = Math.floor(t / (1000 * 60 * 60 * 24));
      let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      let secs = Math.floor((t % (1000 * 60)) / 1000);

      document.getElementById(
        "sprint-days"
      ).innerHTML = `<span class="timer-number">${days}</span> days`;

      document.getElementById(
        "sprint-hours"
      ).innerHTML = `<span class="timer-number">${("0" + hours).slice(
        -2
      )}</span> hours`;

      document.getElementById(
        "sprint-mins"
      ).innerHTML = `<span class="timer-number">${("0" + mins).slice(
        -2
      )}</span> minutes`;

      document.getElementById(
        "sprint-secs"
      ).innerHTML = `<span class="timer-number">${("0" + secs).slice(
        -2
      )}</span> seconds`;
    } else {
      document.getElementById("sprint-countdown").innerHTML =
        "Countdown's over!";
    }
  }, 1000);
}

// Setting up Race timer

let raceTimer = setInterval(function () {
  let now = new Date().getTime();
  let t = raceTarget - now;

  if (t >= 0) {
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    let secs = Math.floor((t % (1000 * 60)) / 1000);

    document.getElementById(
      "race-days"
    ).innerHTML = `<span class="timer-number">${days}</span> days`;

    document.getElementById(
      "race-hours"
    ).innerHTML = `<span class="timer-number">${("0" + hours).slice(
      -2
    )}</span> hours`;

    document.getElementById(
      "race-mins"
    ).innerHTML = `<span class="timer-number">${("0" + mins).slice(
      -2
    )}</span> minutes`;

    document.getElementById(
      "race-secs"
    ).innerHTML = `<span class="timer-number">${("0" + secs).slice(
      -2
    )}</span> seconds`;
  } else {
    document.getElementById("race-countdown").innerHTML = "Countdown's over!";
  }
}, 1000);

// Race timer End
//
//
//
// Going through drivers from the JSON and creating individual divs
//
//
//
import drivers from "./drivers.json";

const driversContainer = document.querySelector(".drivers-container");
let driversHTML = ``;

// taking the imported drivers JSON, ordering by season points
let driversOrdered = drivers.sort((a, b) => {
  if (a.seasonPoints > b.seasonPoints) {
    return -1;
  } else if (b.seasonPoints > a.seasonPoints) {
    return 1;
  } else {
    return 0;
  }
});

// create the HTML for each driver
driversOrdered.forEach((driver) => {
  driversHTML += `<div class="drivers-container-item">
  <h3 class="drivers-container-item-title">${driver.fullName}</h3>
  
  <div class="drivers-container-item-seasondata">
  <span>${driver.seasonPoints} ${
    driver.seasonPoints != 1 ? "points" : "point"
  }</span>
  <span>${driver.seasonWins} ${driver.seasonWins != 1 ? "wins" : "win"}</span>
  <span>${driver.seasonPoles} ${
    driver.seasonPoles != 1 ? "poles" : "pole"
  }</span>
  </div>

 <span class="drivers-container-item-careerdata">
  ${driver.careerWins} ${driver.careerWins != 1 ? "Career Wins" : "Career Win"}
  ${driver.careerPoles} ${driver.careerPoles != 1 ? "Poles" : "Pole"}
  ${driver.championships} ${
    driver.championships != 1 ? "Championships" : "Championship"
  }
  </span>

  <img src="./img/driver_faces/${
    driver.lastName
  }.png" class="drivers-image-left">
  <img src="./img/team_logos/${driver.team}.jpg" class="drivers-image-right">

  </div>`;
});

driversContainer.innerHTML = driversHTML;

//
//
// Fetch Standings from API
//
//
// Get final standings of a searched year from ergast api
const outputDiv = document.querySelector(".output");
const searchForm = document.querySelector(".fetch-container form");
const infoline = document.getElementById("info");
let outputHTML = [];
let searchResult = '';

// On submit
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // clear previous if exists
  outputHTML = [];
  //cont
  searchResult = searchForm.season.value.trim();
  searchForm.reset();
  // Make sure not an empty search
  if (searchResult != "") {
    getStandings(searchResult);
  }
});

// Doing fetch
const getStandings = async (season) => {
  const url = `https://ergast.com/api/f1/${season}/driverStandings.json`;

  const response = await fetch(url);
  const data = await response.json();

  data.MRData.StandingsTable["StandingsLists"][0].DriverStandings.forEach(
    (item, index) => {
      outputHTML[index] = `<div class="driver-data">
      <div>
      #${item.position}</div>
      <div>
      ${item.Driver.givenName + " " + item.Driver.familyName}</div>
      <div>
      ${item.points}
      </div>
      </div>`;
    }
  );
  outputHTML = outputHTML.join("");
  outputDiv.innerHTML = outputHTML;
  infoline.classList.remove("d-none");
  infoline.innerHTML = `<p>Final Standings of Year ${searchResult}</p><p>Position — Name — Points</p>`;
};
