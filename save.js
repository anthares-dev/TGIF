//!  Display top 10% least engaged in the table, sort, and handle duplicate data points

function engagedLeastList(array) {
  for (i = 0, len = array.length; i < 0.1 * len; i++) {
    statistics.leastEngage.push(array[i]);
  }
}

engagedLeastList(
  membersArray.sort(function(a, b) {
    return a.missed_votes_pct - b.missed_votes_pct;
  })
); //calling function already ordened, crescente

function engagedMostList(array) {
  for (i = 0, len = array.length; i < 0.1 * len; i++) {
    statistics.mostEngage.push(array[i]);
  }
}

engagedMostList(
  membersArray.sort(function(a, b) {
    return b.missed_votes_pct - a.missed_votes_pct;
  })
); //calling function already ordened, crescente

function createTable(array, id) {
  for (i = 0, len = array.length; i < len; i++) {
    var tbody = document.getElementById(id); // take the id in order to know where to start
    var row = document.createElement("tr"); // creating first element of the table

    tbody.append(row); // insert row in tbody

    var fullName = document.createElement("td"); // creating all other elements nested inside the first
    var missedVotes = document.createElement("td");
    var percMissedVotes = document.createElement("td");

    row.append(fullName, missedVotes, percMissedVotes); // insert td elements inside the row

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

    missedVotes.innerHTML = array[i].missed_votes;
    percMissedVotes.innerHTML = array[i].missed_votes_pct + " %";
  }
}

createTable(statistics.leastEngage, "tableBodyLeast");
createTable(statistics.mostEngage, "tableBodyMost");

//! only 1 function

function createTableEngaged(array, x, y, id) {
  for (i = 0; i < 0.1 * array.length; i++) {
    array.sort(function(a, b) {
      return x * a.missed_votes_pct + y * b.missed_votes_pct;
    });

    var tbody = document.getElementById(id);
    var row = document.createElement("tr");
    var fullName = document.createElement("td");
    var missedVotes = document.createElement("td");
    var percMissedVotes = document.createElement("td");
    var urlPage = document.createElement("a");
    var att = document.createAttribute("href");

    tbody.append(row);
    row.append(fullName, missedVotes, percMissedVotes);
    fullName.append(urlPage);
    urlPage.setAttributeNode(att);
    att.value = array[i].url;

    urlPage.innerHTML =
      array[i].last_name +
      ", " +
      (array[i].middle_name || " ") +
      array[i].first_name;

    missedVotes.innerHTML = array[i].missed_votes;
    percMissedVotes.innerHTML = array[i].missed_votes_pct + " %";
  }
}

createTableEngaged(membersArray, -1, +1, "tableBodyLeast");
createTableEngaged(membersArray, +1, -1, "tableBodyMost");
