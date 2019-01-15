const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const faveSchema = new Schema({
  titel: { type: String, required: true },
  herf: { type: String, required: true },
  ingredient: { type: String, required: true },
  username: { type: String},
  thumbnail: { type: String},
  selected: { type: Boolean, default: false },
});

const Faves = mongoose.model("Faves", faveSchema);

module.exports = Faves;
