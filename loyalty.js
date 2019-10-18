//! GLOBAL VARIABLES calling
var pageUrl = document.URL;
let membersArray;
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

if (pageUrl.includes("loyalty_senate.html")) {
  url = "https://api.propublica.org/congress/v1/113/senate/members.json";
  console.log("calling data from api-prorepublica - Senate chamber");
} else if (pageUrl.includes("loyalty_house.html")) {
  url = "https://api.propublica.org/congress/v1/113/house/members.json";
  console.log("calling data from api-prorepublica - House chamber");
} else {
  var tbodyAlert = document.getElementById("uncheckedAlert");
  tbodyAlert.innerHTML =
    "<tr><td colspan='5'></td></tr><tr><td colspan='5' class='alert alert-info py-2 text-center' role='alert'>" +
    "no data from the source" +
    "</<td></tr>";
}

var progress = $(".progress");
var progressBar = $(".progress-bar");
var percentVal = 0;
console.log(progressBar.attr("aria-valuenow"));

var id = setInterval(frame, 100);
function frame() {
  percentVal += 5;
  if (progressBar.attr("aria-valuenow") == "100%") {
    console.log("loading completed!");
    console.log(progressBar.attr("aria-valuenow"));
    clearInterval(id);
    progress.addClass("d-none");
  } else if (progressBar.attr("aria-valuenow") == "70%") {
    console.log("start fetching");
    console.log(progressBar.attr("aria-valuenow"));
    fetching();

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

function fetching() {
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
      membersArray = data.results[0].members;
      init();
    })
    .catch(err => {
      console.log(err);
    });
}
//! FUNCTIONS calling
function init() {
  glanceList(membersArray);
  createTableLoyalty(membersArray, +1, -1, "tableBodyLeastLoyalty");
  createTableLoyalty(membersArray, -1, +1, "tableBodyMostLoyalty");
}

//! FUNCTIONS declaration
//* Creating one function in order to take statistics for every party

function glanceList(array) {
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

//*  Display top 10% least and most loyalty in the table, sort, and handle duplicate data points

function createTableLoyalty(array, x, y, id) {
  array.sort(function(a, b) {
    return x * a.votes_with_party_pct + y * b.votes_with_party_pct;
  });

  let memTen = [];
  for (i = 0; i < array.length; i++) {
    if (i < Math.round(0.1 * array.length)) {
      memTen.push(array[i]);
    } else if (
      array[i - 1].votes_with_party_pct === array[i].votes_with_party_pct
    ) {
      memTen.push(array[i]);
    } else {
      break;
    }
  }
  buildTableLoyalty(memTen, id);
}

function buildTableLoyalty(array, id) {
  var tbody = document.getElementById(id);
  for (let i = 0; i < array.length; i++) {
    var row = document.createElement("tr");
    var fullName = document.createElement("td");
    var partyVotes = document.createElement("td");
    var percVotesParty = document.createElement("td");
    var urlPage = document.createElement("a");
    var att = document.createAttribute("href");

    tbody.append(row);
    row.append(fullName, partyVotes, percVotesParty);
    fullName.append(urlPage);
    urlPage.setAttributeNode(att);
    att.value = array[i].url;

    urlPage.innerHTML =
      array[i].last_name +
      ", " +
      (array[i].middle_name || " ") +
      array[i].first_name;

    partyVotes.innerHTML = array[i].total_votes;
    percVotesParty.innerHTML = array[i].votes_with_party_pct + " %";
  }
}
