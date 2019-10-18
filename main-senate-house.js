//document.getElementById("senate-data").innerHTML = JSON.stringify(data, null, 2);

//! GLOBAL VARIABLES calling
var pageUrl = document.URL;
let members;
let checkboxDem = document.getElementById("dem");
let checkboxRep = document.getElementById("rep");
let checkboxInd = document.getElementById("ind");
let option = document.getElementById("listState");
var tbody = document.getElementById("tableBody");

if (pageUrl.includes("senate.html")) {
  url = "https://api.propublica.org/congress/v1/113/senate/members.json";
  console.log("calling data from api-prorepublica - Senate chamber");
} else if (pageUrl.includes("house.html")) {
  url = "https://api.propublica.org/congress/v1/113/house/members.json";
  console.log("calling data from api-prorepublica - House chamber");
} else {
  var tbody = document.getElementById("tableBody");
  tbody.innerHTML =
    "<tr><td colspan='5'></td></tr><tr><td colspan='5' class='alert alert-info py-2 text-center' role='danger'>" +
    "no data from the source" +
    "</<td></tr>";
}

/*
var progressBar = $(".progress-bar");
var percentVal = 0;

window.setInterval(function() {
  percentVal += 10;
  progressBar
    .css("width", percentVal + "%")
    .attr("aria-valuenow", percentVal + "%")
    .text(percentVal + "%");

  if (percentVal == 60) {
    percentVal = 100;
    show();
    progressBar
      .css("width", percentVal + "%")
      .attr("aria-valuenow", "100" + "%")
      .text(percentVal + "%");
  }
}, 500);

*/
/*
var myVar = setInterval(function() {
  myTimer();
}, 1);
var count = 0;
function myTimer() {
  if (count < 100) {
    $(".progress").css("width", count + "%");
    count += 0.05;
    document.getElementById("demo").innerHTML = Math.round(count) + "%";
    // code to do when loading
  } else if (count > 95) {
    // code to do after loading
    show();
    count = 0;
  } 
}
*/

/*
function loading() {

var loading = new window.XMLHttpRequest();
console.log(loading);

var progressBar = $(".progress-bar");
loading.addEventListener(
  progressBar,
  function(evt) {
    if (evt.lengthComputable) {
      var percentComplete = evt.loaded / evt.total;
      console.log(percentComplete);
      progressBar.css({
        width: percentComplete * 100 + "%"
      });

      if (percentComplete === 1) {
        fetching();
        progressBar.addClass("hide");
      }
    }
  },
  false
);

  return loading;
}

*/
/*
var progress = $(".progress");
var progressBar = $(".progress-bar");
var percentVal = 0;

window.setInterval(function() {
  percentVal += 10;
  progressBar
    .css("width", percentVal + "%")
    .attr("aria-valuenow", percentVal + "%")
    .text("LOADING DATA");

  if (percentVal == 100) {
    fetching();

    percentVal = 100;
    progress.addClass("d-none");
  }
}, 200);
*/

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
      members = data.results[0].members;
      init();
    })
    .catch(err => {
      console.log(err);
    });
}

//! FUNCTIONS calling
function init() {
  createTable(members);
  checkboxDem.addEventListener("click", filterEngine);
  checkboxRep.addEventListener("click", filterEngine);
  checkboxInd.addEventListener("click", filterEngine);
  option.addEventListener("change", filterEngine);
}
/*
  //https://stackoverflow.com/questions/40166957/how-to-make-a-loading-progress-bar-in-bootstrap
var progressBar = $(".progress-bar");
var percentVal = 0;

window.setInterval(function() {
  percentVal += 10;
  progressBar
    .css("width", percentVal + "%")
    .attr("aria-valuenow", percentVal + "%")
    .text(percentVal + "%");

  if (percentVal == 100) {
    percentVal = 0;
  }
}, 500);
*/

/*
//! GLOBAL VARIABLES calling
var pageUrl = document.URL;
let members;
let checkboxDem = document.getElementById("dem");
let checkboxRep = document.getElementById("rep");
let checkboxInd = document.getElementById("ind");
let option = document.getElementById("listState");
var tbody = document.getElementById("tableBody");

if (pageUrl.includes("senate.html")) {
  url = "https://api.propublica.org/congress/v1/113/senate/members.json";
  console.log("calling data from api-prorepublica - Senate chamber");
} else if (pageUrl.includes("house.html")) {
  url = "https://api.propublica.org/congress/v1/113/house/members.json";
  console.log("calling data from api-prorepublica - House chamber");
} else {
  var tbody = document.getElementById("tableBody");
  tbody.innerHTML =
    "<tr><td colspan='5'></td></tr><tr><td colspan='5' class='alert alert-info py-2 text-center' role='danger'>" +
    "no data from the source" +
    "</<td></tr>";
}

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
    members = data.results[0].members;
    init();
  })
  .catch(err => {
    console.log(err);
  });*/

//! FUNCTIONS declaration

//* This function use a for loop to construct a table with all the data from a stringify JSON (JSON changed into a JS adding "var data =") and dropdown list with the states

function createTable(array) {
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

      /*
            //* creating the Dropdown list with States using UL and LI

      var stateElements = document.getElementById("listState");
      var liState = document.createElement("li");

      stateElements.append(liState);

      var idState = document.createAttribute("id");

      liState.setAttributeNode(idState);

      idState.value = array[i].state;

      var classState = document.createAttribute("class");
      liState.setAttributeNode(classState);

      classState.value = "dropdown-item";

      liState.innerHTML = array[i].state;*/
    }
  }
}

//! This function let me filter the table according to the party and according to the state

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
  // .filter(member => stateOption.includes(member.state));

  // The filter() method creates an array filled with all array elements that pass a test (provided as a function)
  /*
    -- selectedMembers = members.party --> it could be all members of the parties R D I
    --but I want to fill selectedMembers with the members corrispondenting to the values inside partyValues
    -- partyValues change according to checked or not checkboxes.
  */
  createTable(selectedMembers);
}

/*
function filterByParty() {
  let partyValues = [
    ...document.querySelectorAll("input[type=checkbox]:checked") // ... mutation spread operator - trasform a nodelist into an object
  ].map(checkbox => checkbox.value); // The map() method creates a new array with the results of calling a function for every array element.

  console.log(partyValues);
  let selectedMembers = [];

  for (var i = 0; i <= partyValues.length; i++) {
    var checkedBoxes = [
      ...document.querySelectorAll("input[type=checkbox]:checked")
    ];
    console.log(checkedBoxes);
    if (checkedBoxes == 0) {
      var tbody = document.getElementById("tableBody");
      tbody.innerHTML =
        "<tr><td colspan='5'></td></tr><tr><td colspan='5' class='alert alert-info py-2 text-center' role='alert'>" +
        "Select at least one party!" +
        "</<td></tr>";
    } else {
      selectedMembers.push(
        ...members.filter(qwe => qwe.party === partyValues[i])
      );
      createTable(selectedMembers);
      console.log(selectedMembers);
    }
  }
}
*/

/*/
function filterByState() {
  let selectedState = [];

  selectedState = members.filter(member => stateOption.includes(member.state));
  createTable(selectedState);
}
*/
