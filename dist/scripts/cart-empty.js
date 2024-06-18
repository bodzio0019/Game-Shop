import { search } from "../utils/search.js";

// Search
search("search.html");

// Mobile-Nav
document.querySelector(".navbar-icon").addEventListener("click", () => {
  document.querySelector("nav").classList.toggle("nav-hide");
  document.querySelector(".navbar-icon").classList.toggle("nav-icon-rotate");
});
