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