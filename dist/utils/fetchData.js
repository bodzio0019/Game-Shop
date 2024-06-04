export function fetchData(saveData) {
  let data = [];
  if (sessionStorage.getItem("data")) {
    data = JSON.parse(sessionStorage.getItem("data"));
    saveData(data);
  } else {
    fetch("/api/data")
      .then((res) => res.json())
      .then((res) => {
        data = res;
        sessionStorage.setItem("data", JSON.stringify(data));
        saveData(data);
      })
      .catch((err) => console.log("Error while fetching:", err));
  }
}
