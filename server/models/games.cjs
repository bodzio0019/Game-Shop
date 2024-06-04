const mongoose = require("mongoose");

const ElementScheme = new mongoose.Schema({
  page: String,
  id: Number,
  image: String,
  name: String,
  developer: String,
  status: Number,
  price: Number,
  discount: Number,
  description: String,
  platform: [String],
  release: String,
  sort: Number,
  genre: String,
  quantity: Number,
});

const Games = mongoose.model("game", ElementScheme);

module.exports = Games;
