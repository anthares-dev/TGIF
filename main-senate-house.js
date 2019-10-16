//document.getElementById("senate-data").innerHTML = JSON.stringify(data, null, 2);

//! GLOBAL VARIABLES calling
let members = data.results[0].members;
let checkboxDem = document.getElementById("dem");
let checkboxRep = document.getElementById("rep");
let checkboxInd = document.getElementById("ind");
let option = document.getElementById("listState");

//! FUNCTIONS calling
createTable(members);
checkboxDem.addEventListener("click", filterEngine);
checkboxRep.addEventListener("click", filterEngine);
checkboxInd.addEventListener("click", filterEngine);
option.addEventListener("change", filterEngine);

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
