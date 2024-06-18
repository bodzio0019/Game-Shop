const path = require("path");
const Games = require("../models/games.cjs");

const showGames = (req, res) => {
  Games.find()
    .select("-__v")
    .then((result) => {
      console.log("Data GET:", result);
      res.json(result);
    })
    .catch((err) => {
      console.log("GET error:", err);
      res.sendStatus(404);
    });
};

const search = (req, res) => {
  Games.find({ name: { $regex: req.params.name, $options: "i" } })
    .select("-__v")
    .then((result) => {
      console.log("Data searched:", result);
      res.json(result);
    })
    .catch((err) => {
      console.log("GET error:", err);
      res.sendStatus(404);
    });
};

module.exports = { showGames, search };
