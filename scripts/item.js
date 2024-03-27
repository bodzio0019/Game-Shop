import { data } from "../data/data.js";
import { cart, renderCartIcon } from "../data/cart.js";

// On start
let item = [];
renderItem();
renderCartIcon();

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
        location.href = "../search.html";
    };
});
document.querySelector(".search > input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      document.querySelector(".search > i").click();
    };
});

// Cart icon
document.querySelector(".cart-price-wrapper").addEventListener("click", () => {
    if(cart.length) {
        location.href = "../cart.html";
    } else {
        location.href = "../cart-empty.html";
    };
});

// Mobile-Nav
document.querySelector(".navbar-icon").addEventListener("click", () => {
    document.querySelector("nav").classList.toggle("nav-hide");
    document.querySelector(".navbar-icon").classList.toggle("nav-icon-rotate");
});

// Item render
function renderItem() {
    const result = data.filter(obj => {
        return location.pathname.includes(obj.page);
      });
    item = result[0];
    const htmlHeader = `<div class="item-image">
    <img src="../img/${item.image}.jpg" alt="Game picture" />
    </div>
    <div class="item-cart">
    <h2>${item.name}</h2>
    <p class="developer">${item.developer}</p>
    <p class="status"><i class="fa-solid fa-check" style="color: #048e20;"></i>Available</p>
    <p class="price">${(item.price/100).toFixed(2)} zł</p>
    <div class="cart-wrapper">
    <form name="quantity" action="" method="get">
        <input type="number" name="quantity" class="add-quantity" min="1" max="100" value="1"/>
        <button type="submit" class="add-to-cart">Add to cart</button>
    </form>
    </div>
    <p class="small-info"><i class="fa-solid fa-truck" style="color: #000000;"></i>Free shipping from 300 zł.</p>
    <p class="small-info"><i class="fa-solid fa-star" style="color: #000000;"></i></i>We are an authorized seller and guarantee the originality of the products offered.</p>
    <p class="small-info"><i class="fa-solid fa-rotate-left" style="color: #000000;"></i>Return is possible within 14 days from the date of receipt of the goods.</p>
    </div>`;
    const htmlInfo = ` <div class="item-info-wrapper">
    <h2 class="game-description active-option">Description</h2>
    <h2 class="game-details">Details</h2>
    </div>
    <div class="game-description-text active-text">
    ${item.description}
    </div>
    <div class="game-details-text">
    <div class="game-details-wrapper">
        <p>Platform:</p><p class="js-selector">${item.platform[0]}</p>
        <p>Release:</p><p>${item.release}</p>
        <p>Publisher:</p><p>${item.developer}</p>
        <p>Genre:</p><p>${item.genre}</p>
    </div>
    </div>`;
    document.querySelector(".item-main-header").innerHTML = htmlHeader;
    document.querySelector(".item-main-info").innerHTML = htmlInfo;

    if (item.status === 0) {
        document.querySelector(".status").innerHTML = `<p class="status"><i class="fa-solid fa-xmark" style="color: #e32400;"></i>Out of stock</p>`;
        document.querySelector(".add-quantity").disabled = true;
        document.querySelector(".add-to-cart").disabled = true;
    };

    if(item.platform[1]) {
        document.querySelector(".js-selector").innerHTML = `${item.platform[0]}, ${item.platform[1]}`;
    };

    if(item.discount !== 0) {
        document.querySelector(".price").innerHTML = `<span style="color: rgb(190, 43, 43);">${(item.discount/100).toFixed(2)} zł</span>&nbsp;<span style="text-decoration: line-through; font-size: 1.6rem;">${(item.price/100).toFixed(2)} zł</span>`
    };
};

// Cart
const form = document.forms.quantity;
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let matchItem;

    cart.forEach( (i) => {
        if(i.name === item.name) {
           matchItem = i; 
        };
    });
    
    if(matchItem) {
        matchItem.quantity += +form.quantity.value;
    } else {
        cart.push(item);
        item.quantity =+ +form.quantity.value;
    };
    renderCartIcon();
    localStorage.setItem("cart", JSON.stringify(cart));
});

// Item info
document.querySelector(".game-description").addEventListener("click", () => {
    document.querySelector(".game-details").classList.remove("active-option");
    document.querySelector(".game-description").classList.add("active-option");
    document.querySelector(".game-details-text").classList.remove("active-text");
    document.querySelector(".game-description-text").classList.add("active-text");
});
document.querySelector(".game-details").addEventListener("click", () => {
    document.querySelector(".game-description").classList.remove("active-option");
    document.querySelector(".game-details").classList.add("active-option");
    document.querySelector(".game-description-text").classList.remove("active-text");
    document.querySelector(".game-details-text").classList.add("active-text");
});