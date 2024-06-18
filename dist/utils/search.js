export function search(url) {
  document.querySelector(".search > i").addEventListener("click", () => {
    const valueInput = document.querySelector(".search > input").value;
    const value = valueInput.trim("");
    if (valueInput) {
      let search = [];
      fetch(`/api/search/${value}`)
        .then((result) => {
          if (result.ok) {
            return result.json();
          } else {
            throw new Error("Failed connection to the server");
          }
        })
        .then((result) => {
          search = result;
          sessionStorage.setItem("search", JSON.stringify(search));
          location.href = url;
        })
        .catch((err) => console.log(`GET error: ${err.message}`));
    }
  });
  document
    .querySelector(".search > input")
    .addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        document.querySelector(".search > i").click();
      }
    });
}
