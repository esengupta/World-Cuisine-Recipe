const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  ingredients: {
    type: Array
  },
  uri: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  image: {
    type: String
  },
  dietLabels: {
    type: Array
  },
  healthLabels: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
