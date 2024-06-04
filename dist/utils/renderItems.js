export function renderItems(data) {
  let html = ``;
  data.forEach((data) => {
    if (data.discount === 0) {
      html += `<a href="item-pages/${data.page}.html">
              <div class="game-item">
              <img src="img/${data.image}.jpg" alt="Game picture" />
              <p class="game-title">${data.name}</p>
              <p class="game-price">${(data.price / 100).toFixed(2)} zł</p>
              </div>
              </a>`;
    } else {
      html += `<a href="item-pages/${data.page}.html">
              <div class="game-item">
              <img src="img/${data.image}.jpg" alt="Game picture" />
              <p class="game-title">${data.name}</p>
              <p class="game-price"><span style="color: rgb(190, 43, 43);">${(
                data.discount / 100
              ).toFixed(
                2
              )} zł</span>&nbsp;<span style="text-decoration: line-through; font-size: 0.8rem;">${(
        data.price / 100
      ).toFixed(2)} zł</span></p>
              </div>
              </a>`;
    }
  });
  document.querySelector(".items").innerHTML = html;
}
