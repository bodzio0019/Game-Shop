export function fetchData() {
  let data = [];
  if (sessionStorage.getItem("data")) {
    data = JSON.parse(sessionStorage.getItem("data"));
    return Promise.resolve(data);
  } else {
    return fetch("/api/data")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed connection to the server");
        }
      })
      .then((response) => {
        data = response;
        sessionStorage.setItem("data", JSON.stringify(data));
        return data;
      })
      .catch((err) => console.log("Error while fetching:", err));
  }
}
