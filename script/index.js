import { data } from "../data/data.js";

// On start
renderItems();

// Aside
document.querySelectorAll(".aside-category").forEach( (btn) => {
    btn.addEventListener("click", function() {
        this.nextElementSibling.classList.toggle("aside-hide");
        this.querySelector(".category-arrow").classList.toggle("category-arrow-turn");
    });
});

// Items
function renderItems() {
    let html = ``;
    data.forEach( (data) => {
        html +=`<a href="item-pages/${data.page}.html">
        <div class="game-item">
        <img src="img/${data.image}.jpg" alt="Game picture" />
        <p class="game-title">${data.name}</p>
        <p class="game-price">${data.zloty},${data.grosze} zł</p>
        </div>
        </a>`
    });
    
    (function display() {
        document.querySelector(".items").innerHTML = html;
    })();
};