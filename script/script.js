const asideCategory1 = document.querySelector(".aside-category-1");
const asideCategory2 = document.querySelector(".aside-category-2");

asideCategory1.addEventListener("click", () => {
    document.querySelector(".option-group-1").classList.toggle("aside-hide-1");
    document.querySelector(".category-arrow-1").classList.toggle("category-arrow-turn-1");
});
asideCategory2.addEventListener("click", () => {
    document.querySelector(".option-group-2").classList.toggle("aside-hide-2");
    document.querySelector(".category-arrow-2").classList.toggle("category-arrow-turn-2");
});