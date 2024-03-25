import { cart, renderCartIcon } from "../data/cart.js";

// On start
renderCartIcon();

// Cart
document.querySelector(".delete-all-js").addEventListener("click", () => {
    localStorage.clear();
    location.replace("../cart-empty.html");
});