import { data } from "../data/data.js";

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