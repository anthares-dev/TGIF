//document.getElementById("senate-data").innerHTML = JSON.stringify(
//  data,
//  null,
//  2
//);

//let members = data.results[0].members;
//
//function createTable(membersArray) {
//  var tbody = document.getElementById("tableBody");
//
//  for (i = 0, len = membersArray.length; i < len; i++) {
//    var row = document.createElement("tr");
//    var fullName = document.createElement("td");
//    var party = document.createElement("td");
//    var state = document.createElement("td");
//    var seniority = document.createElement("td");
//    var percentage = document.createElement("td");
//
//    if (membersArray[i].middle_name != null) {
//      // dont display middle name is the
//      fullName.innerHTML =
//        membersArray[i].last_name +
//        ", " +
//        membersArray[i].first_name +
//        ", " +
//        membersArray[i].middle_name;
//    } else {
//      fullName.innerHTML =
//        membersArray[i].last_name + ", " + membersArray[i].first_name;
//    }
//
//    party.innerHTML = membersArray[i].party;
//    state.innerHTML = membersArray[i].state;
//    seniority.innerHTML = membersArray[i].seniority;
//    percentage.innerHTML = membersArray[i].votes_with_party_pct;
//
//    tbody.append(row);
//    row.append(fullName, party, state, seniority, percentage);
//  }
//}
//
//createTable(members);

//! This function use a for loop to construct a table with all the data from a stringify JSON

function createTable(membersArray) {
  for (i = 0, len = membersArray.length; i < len; i++) {
    var tbody = document.getElementById("tableBody"); // take the id in order to know where to start
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
    att.value = membersArray[i].url; // assign to href the value url http...

    urlPage.innerHTML =
      membersArray[i].last_name +
      ", " +
      (membersArray[i].middle_name || " ") + // ( .. ) if true, write the content, else put blank space " "
      membersArray[i].first_name;

    party.innerHTML = membersArray[i].party;
    state.innerHTML = membersArray[i].state;
    seniority.innerHTML = membersArray[i].seniority;
    percentage.innerHTML = membersArray[i].votes_with_party_pct + " %";
  }
}

let members = data.results[0].members;

createTable(members);
