//! GLOBAL VARIABLES calling
var pageUrl = document.URL;
let members;
let button = document.getElementById("less");
//* filter variables
let checkboxDem = document.getElementById("dem");
let checkboxRep = document.getElementById("rep");
let checkboxInd = document.getElementById("ind");
let option = document.getElementById("listState");

//* URL API variables according to the chamber
if (pageUrl.includes("senate.html")) {
  url = "https://api.propublica.org/congress/v1/113/senate/members.json";
  console.log("calling data from api-prorepublica - Senate chamber");
} else if (pageUrl.includes("house.html")) {
  url = "https://api.propublica.org/congress/v1/113/house/members.json";
  console.log("calling data from api-prorepublica - House chamber");
} else {
  console.log("no api data to fetch");

  /*var tbody = document.getElementById("tableBody");
  tbody.innerHTML =
    "<tr><td colspan='5'></td></tr><tr><td colspan='5' class='alert alert-info py-2 text-center' role='danger'>" +
    "no data from the source" +
    "</<td></tr>";*/
}

//! FUNCTIONS calling
if (pageUrl.includes("index.html")) {
  console.log("toggle");
  button.addEventListener("click", toggleReadMoreLess); // Add click event listener where we will provide logic that updates the button text
} else if (pageUrl.includes("senate.html") || pageUrl.includes("house.html")) {
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
  function init() {
    chamberTable(members);
    checkboxDem.addEventListener("click", filterEngine);
    checkboxRep.addEventListener("click", filterEngine);
    checkboxInd.addEventListener("click", filterEngine);
    option.addEventListener("change", filterEngine);
  }
} else {
  console.log("wrong page");
}

//! FUNCTIONS declaration

function toggleReadMoreLess() {
  //  Update the text and icon of the button to toggle beween "More" and "Less" when clicked
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
  createTable(selectedMembers);
}
