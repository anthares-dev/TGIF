//! Read less and read more function in home page
// function readMore() {
//   var dots = document.getElementById("dots");
//   var moreText = document.getElementById("more");
//   var btnText = document.getElementById("myMore");

//   if (dots.style.display === "none") {
//     dots.style.display = "inline";
//     btnText.innerHTML = "Read more";
//     moreText.style.display = "none";
//   } else {
//     dots.style.display = "none";
//     btnText.innerHTML = "Read less";
//     moreText.style.display = "inline";
//   }
// }

//* using addEvemtLister()
/*
Fetch the buttom element
*/
let button = document.getElementById("less");

/*
Add click event listener where we will provide logic that updates the button text
*/
button.addEventListener("click", function() {
  /*
  Update the text and incon of the button to toggle beween "More" and "Less" when clicked
  */
  console.log(button.innerHTML);

  if (button.innerHTML.includes("more")) {
    button.innerHTML =
      "less <i class='fas fa-arrow-up' data-toggle='collapse' data-target='#collapseExample' aria-expanded='false' aria-controls='collapseExample' role='none presentation'></i>";
  } else {
    button.innerHTML =
      "more <i class='fas fa-arrow-down'data-toggle='collapse' data-target='#collapseExample' aria-expanded='false' aria-controls='collapseExample' role='none presentation'></i>";
  }
});
