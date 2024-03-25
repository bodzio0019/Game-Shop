export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function renderCartIcon() {
    if (cart) {
        let sum = 0;
        cart.forEach( (item) => {
            sum += item.price;
        });
        document.querySelector(".cart-sum").innerHTML = `(${cart.length})`;
        document.querySelector(".cart-price").innerHTML = `${(sum/100).toFixed(2)} zł`;
    } else {
        document.querySelector(".cart-sum").innerHTML = `(0)`;
        document.querySelector(".cart-price").innerHTML = `0.00 zł`;
    };
};