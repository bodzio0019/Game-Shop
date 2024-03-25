import { data as data1 } from "../data/data.js";
import { cart, renderCartIcon } from "../data/cart.js";

// On start
const data = data1.filter((item) => {
    return (item.platform[0] === "PS4")||(item.platform[1] === "PS4");
});
renderItems(data);
renderCartIcon();
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

document.querySelector(".reset").addEventListener("click", () => {
    location.reload();
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let tempData = [];
    if (!form.action.checked && !form.rpg.checked && !form.fps.checked && (form.min.value == false) && (form.max.value == false)) {
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
            };
            if (!(form.min.value == "") && (form.max.value == "")) {
                const min = form.min.value + "00";
                const valueData = tempData.filter((item) => {
                    let price = item.discount || item.price;
                    return price >= min;
                });
                tempData = valueData;
            };
            if ((form.min.value == "") && !(form.max.value == "")) {
                const max = form.max.value + "00";
                const valueData = tempData.filter((item) => {
                    let price = item.discount || item.price;
                    return price <= max;
                });
                tempData = valueData;
            };
        } else {
            if (form.action.checked === true) {
                const sortedArray = data.filter((item) => {
                    return item.genre === "Action";
                });
                tempData.push(...sortedArray);
            };
            if (form.rpg.checked === true) {
                const sortedArray = data.filter((item) => {
                    return item.genre === "RPG";
                });
                tempData.push(...sortedArray);
            };
            if (form.fps.checked === true) {
                const sortedArray = data.filter((item) => {
                    return item.genre === "FPS";
                });
                tempData.push(...sortedArray);
            };
            if (!(form.min.value == "") && !(form.max.value == "")) {
                const min = form.min.value + "00";
                const max = form.max.value + "00";
                const valueData = tempData.filter((item) => {
                    let price = item.discount || item.price;
                    return price >= min && price <= max;
                });
                tempData = valueData;
            };
            if (!(form.min.value == "") && (form.max.value == "")) {
                const min = form.min.value + "00";
                const valueData = tempData.filter((item) => {
                    let price = item.discount || item.price;
                    return price >= min;
                });
                tempData = valueData;
            };
            if ((form.min.value == "") && !(form.max.value == "")) {
                const max = form.max.value + "00";
                const valueData = tempData.filter((item) => {
                    let price = item.discount || item.price;
                    return price <= max;
                });
                tempData = valueData;
            };
        };
        document.querySelector(".sort-disable").removeAttribute("disabled", "");
        document.querySelector(".sort-disable").selected = true;
        asideData = tempData;
        renderItems(tempData);
    };
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