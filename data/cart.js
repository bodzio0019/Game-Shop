export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function renderCartIcon() {
    if (cart.length) {
        let sum = 0;
        cart.forEach( (item) => {
            sum += item.price;
        });
        document.querySelector(".cart-sum").innerHTML = `(${cart.length})`;
        document.querySelector(".cart-price").innerHTML = `${(sum/100).toFixed(2)} zł`;
    };
};