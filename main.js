//! GLOBAL VARIABLES calling
var pageUrl = document.URL;
let members;
//* URL API variables according to the chamber
if (pageUrl.includes("senate.html")) {
  url = "https://api.propublica.org/congress/v1/113/senate/members.json";
  console.log("calling data from api-prorepublica - Senate chamber");
} else if (pageUrl.includes("house.html")) {
  url = "https://api.propublica.org/congress/v1/113/house/members.json";
  console.log("calling data from api-prorepublica - House chamber");
} else {
  console.log("no data from the source");
  /*var tbody = document.getElementById("tableBody");
  tbody.innerHTML =
    "<tr><td colspan='5'></td></tr><tr><td colspan='5' class='alert alert-info py-2 text-center' role='danger'>" +
    "no data from the source" +
    "</<td></tr>";*/
}

//* INDEX.HTML - HOME
let button = document.getElementById("less");

//* SENATE.HTML AND HOUSE.HTML

let listPercVotesRep = []; //non ne ho bisogno
let listPercVotesDem = [];
let listPercVotesInd = [];

let statistics = {
  republican: 0,
  democrat: 0,
  independent: 0,
  totalMem: 0,
  percVotesRep: 0,
  averPercVotesRepRounded: 0,
  percVotesDem: 0,
  averPercVotesDemRounded: 0,
  percVotesInd: 0,
  averPercVotesIndRounded: 0,
  totalAvarPerVotesRounded: 0,
  leastEngage: [], // 10 % senstor call the information
  mostEngage: []
};
// FILTER VARIABLES
let checkboxDem = document.getElementById("dem");
let checkboxRep = document.getElementById("rep");
let checkboxInd = document.getElementById("ind");
let option = document.getElementById("listState");

//! FUNCTIONS calling
if (pageUrl.includes("index.html")) {
  // for home
  console.log("toggle");
  button.addEventListener("click", toggleReadMoreLess); // Add click event listener where we will provide logic that updates the button text
} else if (pageUrl.includes("attendance") || pageUrl.includes("loyalty")) {
  // for statistics attendance and loyalty
  function init() {
    chamberGlanceTable(members);
    statisticsTable(members, -1, +1, "tableBodyLeast");
    statisticsTable(members, +1, -1, "tableBodyMost");
  }
} else {
  // for senate.html and house.html
  function init() {
    chamberTable(members);
    checkboxDem.addEventListener("click", filterEngine);
    checkboxRep.addEventListener("click", filterEngine);
    checkboxInd.addEventListener("click", filterEngine);
    option.addEventListener("change", filterEngine);
  }
}

//! FUNCTIONS declaration

//* PROGRESS BAR FOR ALL PAGES EXCEPT HOME PAGE
if (pageUrl.includes("senate.html") || pageUrl.includes("house.html")) {
  console.log("chamber selected");
  //* progressBar variables
  var progress = $(".progress");
  var progressBar = $(".progress-bar");
  var percentVal = 0;
  var setInterval = setInterval(loadingBarAndData, 100);
  function loadingBarAndData() {
    percentVal += 5;
    console.log(progressBar.attr("aria-valuenow"));
    if (progressBar.attr("aria-valuenow") == "100%") {
      console.log("loading completed!");
      console.log(progressBar.attr("aria-valuenow"));
      clearInterval(setInterval);
      progress.addClass("d-none");
    } else if (progressBar.attr("aria-valuenow") == "70%") {
      console.log("start fetching");
      console.log(progressBar.attr("aria-valuenow"));

      //* calling the DATA
      fetchingDatafromAPI();

      progressBar
        .css("width", percentVal + "%")
        .attr("aria-valuenow", percentVal + "%")
        .text("LOADING DATA");
    } else {
      console.log("start loading");
      console.log("loading...");
      console.log(progressBar.attr("aria-valuenow"));

      progressBar
        .css("width", percentVal + "%")
        .attr("aria-valuenow", percentVal + "%")
        .text("LOADING DATA");
    }
  }
}

function fetchingDatafromAPI() {
  fetch(url, {
    method: "GET",
    headers: {
      "X-API-Key": "jE5SNQfVeb7jWnJGjzcnGJB83JNqzFh1Vg5Ooi36"
    }
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    })
    .then(data => {
      console.log(data);
      console.log("all data fetched!");
      members = data.results[0].members;
      init();
    })
    .catch(err => {
      console.log(err);
    });
}

//*  Update the text and icon of the button to toggle between "More" and "Less" when clicked
function toggleReadMoreLess() {
  console.log(button.innerHTML);
  if (button.innerHTML.includes("more")) {
    button.innerHTML =
      "less <i class='fas fa-arrow-up' data-toggle='collapse' data-target='#collapseExample' aria-expanded='false' aria-controls='collapseExample' role='none presentation'></i>";
  } else {
    button.innerHTML =
      "more <i class='fas fa-arrow-down'data-toggle='collapse' data-target='#collapseExample' aria-expanded='false' aria-controls='collapseExample' role='none presentation'></i>";
  }
}

//* This function use a for loop to construct a table with all the data from a stringify JSON (JSON changed into a JS adding "var data =") and dropdown list with the states
function chamberTable(array) {
  var tbody = document.getElementById("tableBody"); // take the id in order to know where to start
  tbody.innerHTML = ""; // clear the table

  if (array.length == 0) {
    tbody.innerHTML =
      "<tr><td colspan='5'></td></tr><tr><td colspan='5' class='alert alert-info py-2 text-center' role='alert'>" +
      "Select at least one party!" +
      "</<td></tr>";
  } else {
    for (i = 0, len = array.length; i < len; i++) {
      //* creating the table
      var row = document.createElement("tr"); // creating first element of the table

      tbody.append(row); // insert row in tbody

      var fullName = document.createElement("td"); // creating all other elements nested inside the first
      var party = document.createElement("td");
      var state = document.createElement("td");
      var seniority = document.createElement("td");
      var percentage = document.createElement("td");

      row.append(fullName, party, state, seniority, percentage); // insert td elements inside the row

      var urlPage = document.createElement("a"); // create <a> </a> that will be nested inside fullName
      var att = document.createAttribute("href"); // create attribute href: that will be assigned inside <a>

      fullName.append(urlPage);
      urlPage.setAttributeNode(att);
      att.value = array[i].url; // assign to href the value url http...

      urlPage.innerHTML =
        array[i].last_name +
        ", " +
        (array[i].middle_name || " ") + // ( .. ) if true, write the content, else put blank space " "
        array[i].first_name;

      party.innerHTML = array[i].party;
      state.innerHTML = array[i].state;
      seniority.innerHTML = array[i].seniority;
      percentage.innerHTML = array[i].votes_with_party_pct + " %";

      //* creating the Dropdown list with States

      var stateOption = document.getElementById("listState");
      var opState = document.createElement("option");

      stateOption.append(opState);

      var idState = document.createAttribute("id");

      opState.setAttributeNode(idState);

      idState.value = array[i].state;

      var valueState = document.createAttribute("value");
      opState.setAttributeNode(valueState);

      valueState.value = array[i].state;

      opState.innerHTML = array[i].state;
    }
  }
}

//* This function let me filter the table according to the party and according to the state

function filterEngine() {
  let partyValues = [
    ...document.querySelectorAll("input[type=checkbox]:checked") // ... mutation spread operator - trasform a nodelist into an object
  ].map(checkbox => checkbox.value); // The map() method creates a new array with the results of calling a function for every array element.
  console.log(partyValues);

  let stateOption = option.value;

  let selectedMembers = [];

  selectedMembers = members.filter(
    member =>
      partyValues.includes(member.party) &&
      (stateOption.includes(member.state) || stateOption.includes("all"))
  );

  // The filter() method creates an array filled with all array elements that pass a test (provided as a function)
  /*
    -- selectedMembers = members.party --> it could be all members of the parties R D I
    --but I want to fill selectedMembers with the members corrispondenting to the values inside partyValues
    -- partyValues change according to checked or not checkboxes.
  */
  chamberTable(selectedMembers);
}

//* Creating one function in order to take statistics for both chambers

function chamberGlanceTable(array) {
  let totalVotes = 0;
  for (i = 0, len = array.length; i < len; i++) {
    votes = array[i].votes_with_party_pct;
    if (array[i].party == "R") {
      statistics.republican++;
      listPercVotesRep.push(votes);
    } else if (array[i].party == "D") {
      statistics.democrat++;
      listPercVotesDem.push(votes);
    } else {
      statistics.independent++;
      listPercVotesInd.push(votes);
    }
    totalVotes += array[i].votes_with_party_pct;
  }

  statistics.totalMem =
    statistics.republican + statistics.democrat + statistics.independent;

  let averPercVotesRep =
    (statistics.percVotesRep =
      listPercVotesRep.reduce((a, b) => a + b, 0) / statistics.republican) || 0;
  let averPercVotesDem =
    (statistics.percVotesDem =
      listPercVotesDem.reduce((a, b) => a + b, 0) / statistics.democrat) || 0;
  let averPercVotesInd =
    (statistics.percVotesInd =
      listPercVotesInd.reduce((a, b) => a + b, 0) / statistics.independent) ||
    0;

  statistics.averPercVotesRepRounded = averPercVotesRep.toFixed(2);
  statistics.averPercVotesDemRounded = averPercVotesDem.toFixed(2);
  statistics.averPercVotesIndRounded = averPercVotesInd.toFixed(2);

  let totalAvarPerVotes = totalVotes / array.length;

  statistics.totalAvarPerVotesRounded = totalAvarPerVotes.toFixed(2);

  //* adding to HTML
  buildTableGlance();
}

function buildTableGlance() {
  var nR = document.getElementById("num-rep");
  var nD = document.getElementById("num-dem");
  var nI = document.getElementById("num-ind");
  var nTot = document.getElementById("num-tot");
  nR.innerHTML = statistics.republican;
  nD.innerHTML = statistics.democrat;
  nI.innerHTML = statistics.independent;
  nTot.innerHTML = statistics.totalMem;

  var percR = document.getElementById("perc-rep");
  var percD = document.getElementById("perc-dem");
  var percI = document.getElementById("perc-ind");
  var percTot = document.getElementById("perc-tot");
  percR.innerHTML = statistics.averPercVotesRepRounded + " %";
  percD.innerHTML = statistics.averPercVotesDemRounded + " %";
  percI.innerHTML = statistics.averPercVotesIndRounded + " %";
  percTot.innerHTML = statistics.totalAvarPerVotesRounded + " %";
}

//*  Display top 10% least and most engaged and loyalty in the table, sort, and handle duplicate data points
// sorting https://stackoverflow.com/questions/51412901/javascript-sort-an-array-of-objects-based-on-numeric-key

function statisticsTable(array, x, y, id) {
  array.sort(function(a, b) {
    if (
      pageUrl.includes("attendance_senate.html") ||
      pageUrl.includes("attendance_house.html")
    ) {
      return x * a.missed_votes_pct + y * b.missed_votes_pct;
    } else if (
      pageUrl.includes("loyalty_senate.html") ||
      pageUrl.includes("loyalty_house.html")
    ) {
      return y * a.votes_with_party_pct + x * b.votes_with_party_pct;
    } else {
      console.log("createTable error");
    }
  });

  let memTen = [];

  for (i = 0; i < array.length; i++) {
    if (i < Math.round(0.1 * array.length)) {
      memTen.push(array[i]);
    } else if (
      array[i - 1].missed_votes_pct === array[i].missed_votes_pct ||
      array[i - 1].votes_with_party_pct === array[i].votes_with_party_pct
    ) {
      memTen.push(array[i]);
    } else {
      break;
    }
  }
  //* adding to HTML
  buildTableStatistics(memTen, id);
}

function buildTableStatistics(array, id) {
  var tbody = document.getElementById(id);

  for (let i = 0; i < array.length; i++) {
    var row = document.createElement("tr");
    var fullName = document.createElement("td");
    var urlPage = document.createElement("a");
    var att = document.createAttribute("href");

    tbody.append(row);

    fullName.append(urlPage);
    urlPage.setAttributeNode(att);
    att.value = array[i].url;

    urlPage.innerHTML =
      array[i].last_name +
      ", " +
      (array[i].middle_name || " ") +
      array[i].first_name;
    if (
      pageUrl.includes("attendance_senate.html") ||
      pageUrl.includes("attendance_house.html")
    ) {
      var missedVotes = document.createElement("td");
      var percMissedVotes = document.createElement("td");
      row.append(fullName, missedVotes, percMissedVotes);
      missedVotes.innerHTML = array[i].missed_votes;
      percMissedVotes.innerHTML = array[i].missed_votes_pct + " %";
    } else if (
      pageUrl.includes("loyalty_senate.html") ||
      pageUrl.includes("loyalty_house.html")
    ) {
      var partyVotes = document.createElement("td");
      var percVotesParty = document.createElement("td");
      row.append(fullName, partyVotes, percVotesParty);

      partyVotes.innerHTML = array[i].total_votes;
      percVotesParty.innerHTML = array[i].votes_with_party_pct + " %";
    } else {
      console.log("buildTable error");
    }
  }
}
