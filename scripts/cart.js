import { cart, renderCartIcon } from "../data/cart.js";

// On start
renderCartIcon();
renderCart();

// Cart
function renderCart() {
    let html = ``;
    cart.forEach( (item) => {
        html +=`<div class="item-details">
        <p class="details-img flex-justify-center"><img src="img/${item.image}.jpg" alt="Game picture" /></p>
        <div class="details-name"><a href="item-pages/${item.page}.html"><p>${item.name}</p></a></div>
        <p class="details-price-unit flex-justify-center">${((item.discount || item.price)/100).toFixed(2)} zł</p>
        <p class="details-price flex-justify-center">${((item.discount || item.price)/100).toFixed(2) * item.quantity} zł</p>
        <p class="details-quantity flex-justify-center"><input type="number" value="${item.quantity}"/></p>
        <p class="details-delete flex-justify-center"><i class="fa-solid fa-circle-xmark" style="color: #b51a00;"></i></p>
        </div>`;
    });
    document.querySelector(".items-wrapper").innerHTML = html;
};

document.querySelector(".delete-all-js").addEventListener("click", () => {
    localStorage.clear();
    location.replace("../cart-empty.html");
});