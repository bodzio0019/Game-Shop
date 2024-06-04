import { fetchData } from "../utils/fetchData.js";
import { search } from "../utils/search.js";

// On start
let data = [];
fetchData((fetchedData) => {
  data = fetchedData;
});

// Search
search(data, "search.html");

// Mobile-Nav
document.querySelector(".navbar-icon").addEventListener("click", () => {
  document.querySelector("nav").classList.toggle("nav-hide");
  document.querySelector(".navbar-icon").classList.toggle("nav-icon-rotate");
});
