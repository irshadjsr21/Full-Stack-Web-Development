function onInput(event) {
  var searchText = event.target.value;

  var searchContent = document.getElementById("search-content");

  searchContent.innerHTML = "<h2>" + searchText + "</h2>";
}

function run() {
  var search = document.getElementById("search-box");
  console.log(search);

  search.addEventListener("input", onInput);
}

window.onload = run;

//document.write("Hello");
//var search = document.getElementById("search-box");
//console.log(search);
