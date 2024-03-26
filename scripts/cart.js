import { cart, renderCartIcon } from "../data/cart.js";

// On start
renderCartIcon();
renderCart();
renderSum();

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
        </div>`;
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
            location.replace("cart-empty.html");
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
    location.replace("cart-empty.html");
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