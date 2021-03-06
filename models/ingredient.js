const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: { type: String, required: true },
  selected: { type: Boolean, default: false },
  username: { type: String},
  
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
