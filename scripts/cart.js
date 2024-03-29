import { data } from "../data/data.js";
import { cart, renderCartIcon } from "../data/cart.js";

// On start
renderCartIcon();
renderCart();
renderSum();
if (!cart.length) {
    location.href = "cart-empty.html";
};

// Search
document.querySelector(".search > i").addEventListener("click", () => {
    const valueInput = document.querySelector(".search > input").value
    const value = valueInput.toLowerCase().replace(/[^a-z0-9]/g, '');
    if(valueInput) {
        const search = data.filter( (item) => {
                const name = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
                return name.includes(value);
            });
        sessionStorage.setItem("search", JSON.stringify(search))
        location.href = "search.html";
    };
});
document.querySelector(".search > input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      document.querySelector(".search > i").click();
    };
});

// Cart
function renderCart() {
    let html = ``;
    cart.forEach( (item) => {
        html +=`<div class="item-details">
        <p class="details-img flex-justify-center"><img src="img/${item.image}.jpg" alt="Game picture" /></p>
        <div class="details-name"><a href="item-pages/${item.page}.html"><p>${item.name}</p></a></div>
        <p class="details-price-unit flex-justify-center">${((item.discount || item.price)/100).toFixed(2)} zł</p>
        <p class="details-price flex-justify-center">${(((item.discount || item.price)/100) * item.quantity).toFixed(2)} zł</p>
        <p class="details-quantity details-quantity-${item.id} flex-justify-center"><input type="number" value="${item.quantity}" min="1" max="100"/><i class="fa-solid fa-rotate refresh-item" style="color: #0042aa;" data-id="${item.id}"></i></p>
        <p class="details-delete flex-justify-center"><i class="fa-solid fa-circle-xmark delete-item" style="color: #b51a00;" data-id="${item.id}"></i></p>
        <p class="item-modal-mobile"><i class="fa-solid fa-ellipsis-vertical" style="color: #000000;" data-id="${item.id}"></i></p>
        </div>
        <div class="item-modal-wrapper wrapper-js-${item.id}">
        <p class="refresh-modal">Quantity:</p><p class="delete-modal">Delete:</p>
        <p class="details-quantity details-quantity-${item.id} details-quantity-js-${item.id} flex-justify-center details-quantity-modal"><input type="number" value="${item.quantity}" min="1" max="100"/><i class="fa-solid fa-rotate refresh-item refresh-item-js" style="color: #0042aa;" data-id="${item.id}"></i></p>
        <p class="details-delete flex-justify-center details-delete-modal"><i class="fa-solid fa-circle-xmark delete-item" style="color: #b51a00;" data-id="${item.id}"></i></p></div>`;
    });
    document.querySelector(".items-wrapper").innerHTML = html;
};

document.querySelectorAll(".delete-item").forEach( (item) => {
    item.addEventListener("click", () => {
        let product = cart.find( (i) => {
            return i.id == item.dataset.id;
        });
        const index = cart.indexOf(product);
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        if(cart.length) {
            location.reload();
        } else {
            location.href = "cart-empty.html";
        };
    });
});

document.querySelectorAll(".refresh-item").forEach( (item) => {
    item.addEventListener("click", () => {
        let product = cart.find( (i) => {
            return i.id == item.dataset.id;
        });
        const index = cart.indexOf(product);
        cart[index].quantity = +document.querySelector(`.details-quantity-${cart[index].id} > input`).value;
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
    });
});

document.querySelector(".delete-all-js").addEventListener("click", () => {
    localStorage.clear();
    location.href = "cart-empty.html";
});

function renderSum() {
    let sum = 0;
    cart.forEach( (item) => {
        let itemPrice = item.discount || item.price;
        sum += (itemPrice * item.quantity)
    });
    document.querySelector(".item-price").innerHTML = `${(sum/100).toFixed(2)} zł`;

    if(sum < 30000) {
        document.querySelector(".item-shipping").innerHTML = `20.00 zł`;
        sum += 2000;
    };
    document.querySelector(".last-cost").innerHTML = `${(sum/100).toFixed(2)} zł`;
};

// Mobile-Nav
document.querySelector(".navbar-icon").addEventListener("click", () => {
    document.querySelector("nav").classList.toggle("nav-hide");
    document.querySelector(".navbar-icon").classList.toggle("nav-icon-rotate");
});

document.querySelectorAll(".refresh-item-js").forEach( (item) => {
    item.addEventListener("click", () => {
        let product = cart.find( (i) => {
            return i.id == item.dataset.id;
        });
        const index = cart.indexOf(product);
        cart[index].quantity = +document.querySelector(`.details-quantity-js-${cart[index].id} > input`).value;
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
    });
});

document.querySelectorAll(".item-modal-mobile > i").forEach( (item) => {
    item.addEventListener("click", () => {
        document.querySelector(`.wrapper-js-${item.dataset.id}`).classList.toggle("item-modal-wrapper-show");
    });
});