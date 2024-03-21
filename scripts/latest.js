import { data } from "../data/data.js";

// On start
data.sort((a, b) => b.sort - a.sort );
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
    for(let i = 0; i < 7; i++) {
        if (data[i].discount === 0) {
            html +=`<a href="item-pages/${data[i].page}.html">
            <div class="game-item">
            <img src="img/${data[i].image}.jpg" alt="Game picture" />
            <p class="game-title">${data[i].name}</p>
            <p class="game-price">${(data[i].price/100).toFixed(2)} zł</p>
            </div>
            </a>`;
        } else {
            html +=`<a href="item-pages/${data[i].page}.html">
            <div class="game-item">
            <img src="img/${data[i].image}.jpg" alt="Game picture" />
            <p class="game-title">${data[i].name}</p>
            <p class="game-price"><span style="color: rgb(190, 43, 43);">${(data[i].discount/100).toFixed(2)} zł</span>&nbsp;<span style="text-decoration: line-through; font-size: 0.8rem;">${(data[i].price/100).toFixed(2)} zł</span></p>
            </div>
            </a>`;
        };
    };
    document.querySelector(".items").innerHTML = html;
};