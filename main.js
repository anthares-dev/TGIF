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

let members = data.results[0].members;

function createTable(membersArray) {
  var tbody = document.getElementById("tableBody");

  for (i = 0, len = membersArray.length; i < len; i++) {
    var row = document.createElement("tr");
    var fullName = document.createElement("td");
    var party = document.createElement("td");
    var state = document.createElement("td");
    var seniority = document.createElement("td");
    var percentage = document.createElement("td");

    fullName.innerHTML =
      membersArray[i].last_name +
      ", " +
      (membersArray[i].middle_name || " ") + // ( .. ) if true, write the content, else put blank space " "
      membersArray[i].first_name;

    party.innerHTML = membersArray[i].party;
    state.innerHTML = membersArray[i].state;
    seniority.innerHTML = membersArray[i].seniority;
    percentage.innerHTML = membersArray[i].votes_with_party_pct + " %";

    tbody.append(row);
    row.append(fullName, party, state, seniority, percentage);
  }
}

createTable(members);
