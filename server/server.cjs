const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const URL = require("./pass.cjs");
const { showGames, search } = require("./controllers/games.cjs");

// Middlewares
const app = express();
app.use(cors());
app.use(express.static("../dist"));

// Connect to MongoDB and start listening
mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected do MongoDB");
    try {
      app.listen(3001, () => {
        console.log("Server is listening to port 3001...");
      });
    } catch (error) {
      console.log("Failed to create server:", error);
    }
  })
  .catch((err) => console.log("Failed to connect to MongoDB:", err));

// REST API
app.get("/api/data", showGames);

app.get("/api/search/:name", search);
