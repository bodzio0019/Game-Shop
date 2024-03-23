import { data as data1 } from "../data/data.js";

// On start
const data = data1.filter((item) => {
    return (item.platform[0] === "PS5")||(item.platform[1] === "PS5");
});
renderItems(data);
const form = document.forms.aside;
let asideData = [];
const select = document.querySelector("#sort");

// Aside
document.querySelectorAll(".aside-category").forEach( (btn) => {
    btn.addEventListener("click", function() {
        this.nextElementSibling.classList.toggle("aside-hide");
        this.querySelector(".category-arrow").classList.toggle("category-arrow-turn");
    });
});

// Sort
select.addEventListener("change", () => {
    document.querySelector(".sort-disable").setAttribute("disabled", "");
    if (asideData == 0) {
        asideSort(data);
    } else {
        asideSort(asideData);
    }
});

function asideSort(data) {
    switch(select.value) {
        case "lowest price":
            data.sort((a, b) => { 
                let first = "";
                let second = "";
                if(a.discount !== 0) {
                    first = a.discount;
                } else {
                    first = a.price;
                };
                if(b.discount !== 0) {
                    second = b.discount;
                } else {
                    second = b.price;
                };
               return first - second;
            });
            renderItems(data);
            break;
        case "highest price":
            data.sort((a, b) => { 
                let first = "";
                let second = "";
                if(a.discount !== 0) {
                    first = a.discount;
                } else {
                    first = a.price;
                };
                if(b.discount !== 0) {
                    second = b.discount;
                } else {
                    second = b.price;
                };
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
    };
};

// Items
function renderItems(data) {
    let html = ``;
    data.forEach( (data) => {
        if (data.discount === 0) {
            html +=`<a href="item-pages/${data.page}.html">
            <div class="game-item">
            <img src="img/${data.image}.jpg" alt="Game picture" />
            <p class="game-title">${data.name}</p>
            <p class="game-price">${(data.price/100).toFixed(2)} zł</p>
            </div>
            </a>`;
        } else {
            html +=`<a href="item-pages/${data.page}.html">
            <div class="game-item">
            <img src="img/${data.image}.jpg" alt="Game picture" />
            <p class="game-title">${data.name}</p>
            <p class="game-price"><span style="color: rgb(190, 43, 43);">${(data.discount/100).toFixed(2)} zł</span>&nbsp;<span style="text-decoration: line-through; font-size: 0.8rem;">${(data.price/100).toFixed(2)} zł</span></p>
            </div>
            </a>`;
        };
    });
    document.querySelector(".items").innerHTML = html;
};