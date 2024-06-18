import { cart, renderCartIcon } from "../data/cart.js";
import { fetchData } from "../utils/fetchData.js";
import { renderItems } from "../utils/renderItems.js";
import { search } from "../utils/search.js";

// On start
let data = [];
let asideData = [];
const form = document.forms.aside;
fetchData().then((result) => {
  data = result;
  renderItems(data);
});
renderCartIcon();

// Search
search("search.html");

// Cart
document.querySelector(".cart-price-wrapper").addEventListener("click", () => {
  if (cart.length) {
    location.href = "cart.html";
  } else {
    location.href = "cart-empty.html";
  }
});

// Mobile-Nav
document.querySelector(".navbar-icon").addEventListener("click", () => {
  document.querySelector("nav").classList.toggle("nav-hide");
  document.querySelector(".navbar-icon").classList.toggle("nav-icon-rotate");
});

// Aside
document.querySelectorAll(".aside-category").forEach((btn) => {
  btn.addEventListener("click", function () {
    btn.nextElementSibling.classList.toggle("aside-hide");
    btn
      .querySelector(".category-arrow")
      .classList.toggle("category-arrow-turn");
  });
});

document.querySelectorAll(".price-box").forEach((i) => {
  i.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.querySelector(".filter").click();
    }
  });
});

document.querySelector(".reset").addEventListener("click", () => {
  location.reload();
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let tempData = [];
  if (
    !form.action.checked &&
    !form.rpg.checked &&
    !form.fps.checked &&
    form.min.value == false &&
    form.max.value == false
  ) {
    location.reload();
  } else {
    if (!form.action.checked && !form.rpg.checked && !form.fps.checked) {
      tempData = data;
      if (!(form.min.value == "") && !(form.max.value == "")) {
        const min = form.min.value + "00";
        const max = form.max.value + "00";
        const valueData = tempData.filter((item) => {
          let price = item.discount || item.price;
          return price >= min && price <= max;
        });
        tempData = valueData;
      }
      if (!(form.min.value == "") && form.max.value == "") {
        const min = form.min.value + "00";
        const valueData = tempData.filter((item) => {
          let price = item.discount || item.price;
          return price >= min;
        });
        tempData = valueData;
      }
      if (form.min.value == "" && !(form.max.value == "")) {
        const max = form.max.value + "00";
        const valueData = tempData.filter((item) => {
          let price = item.discount || item.price;
          return price <= max;
        });
        tempData = valueData;
      }
    } else {
      if (form.action.checked === true) {
        const sortedArray = data.filter((item) => {
          return item.genre === "Action";
        });
        tempData.push(...sortedArray);
      }
      if (form.rpg.checked === true) {
        const sortedArray = data.filter((item) => {
          return item.genre === "RPG";
        });
        tempData.push(...sortedArray);
      }
      if (form.fps.checked === true) {
        const sortedArray = data.filter((item) => {
          return item.genre === "FPS";
        });
        tempData.push(...sortedArray);
      }
      if (!(form.min.value == "") && !(form.max.value == "")) {
        const min = form.min.value + "00";
        const max = form.max.value + "00";
        const valueData = tempData.filter((item) => {
          let price = item.discount || item.price;
          return price >= min && price <= max;
        });
        tempData = valueData;
      }
      if (!(form.min.value == "") && form.max.value == "") {
        const min = form.min.value + "00";
        const valueData = tempData.filter((item) => {
          let price = item.discount || item.price;
          return price >= min;
        });
        tempData = valueData;
      }
      if (form.min.value == "" && !(form.max.value == "")) {
        const max = form.max.value + "00";
        const valueData = tempData.filter((item) => {
          let price = item.discount || item.price;
          return price <= max;
        });
        tempData = valueData;
      }
    }
    document.querySelector(".sort-disable").removeAttribute("disabled", "");
    document.querySelector(".sort-disable").selected = true;
    asideData = tempData;
    renderItems(tempData);
    document.querySelector(".exit-aside > p").click();
  }
});

// Mobile-Aside
document.querySelector(".exit-aside > p").addEventListener("click", () => {
  document.querySelector("aside").classList.toggle("aside-show");
  document.querySelector("body").style.position = "static";
});

// Mobile-Filter
document.querySelector(".mobile-aside").addEventListener("click", () => {
  document.querySelector("aside").classList.toggle("aside-show");
  setTimeout(() => {
    document.querySelector("body").style.position = "fixed";
  }, "300");
});

// Sort
document.querySelector("#sort").addEventListener("change", () => {
  document.querySelector(".sort-disable").setAttribute("disabled", "");
  if (asideData == 0) {
    asideSort(data);
  } else {
    asideSort(asideData);
  }
});

function asideSort(data) {
  switch (document.querySelector("#sort").value) {
    case "lowest price":
      data.sort((a, b) => {
        let first = a.discount || a.price;
        let second = b.discount || b.price;
        return first - second;
      });
      renderItems(data);
      break;
    case "highest price":
      data.sort((a, b) => {
        let first = a.discount || a.price;
        let second = b.discount || b.price;
        return second - first;
      });
      renderItems(data);
      break;
    case "name a z":
      data.sort((a, b) => a.name.localeCompare(b.name));
      renderItems(data);
      break;
    case "name z a":
      data.sort((a, b) => b.name.localeCompare(a.name));
      renderItems(data);
      break;
  }
}
