const mongoose = require("mongoose");
const db = require("../models");

//This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/recipelist"
);

const ingredientSeed = [
  {
    name: "Salt",
    selected: "false"
  },
  {
    name: "Sugar",
    selected: "false"
  },
  {
    name: "Eggs",
    selected: "false"
  },
  {
    name: "Bread",
    selected: "false"
  },
  {
    name: "Oregano",
    selected:"false"
  },
  {
    name: "Tuna",
    selected: "false"
  },
  {
    name: "Ground-Turkey",
    selected: "false"
  },
  {
    name: "Oatmeal",
    selected: "false"
  },
  {
    name: "Butter",
    selected:"false"
  },
  {
    name: "Flour",
    selected: "false"
  },
  {
    name: "Peas",
    selected: "false"
  },
  {
    name: "Tomatoes",
    selected: "false"
  },
  {
    name: "Crushed Garlic",
    selected: "false"
  },
  {
    name: "Cream of Mushroom Soup",
    selected: "false"
  },
  {
    name: "Spaghetti Noodles",
    selected: "false"
  },
  {
    name: "Chicken",
    selected: "false"
  },
  {
    name: "Mixed Vegetable",
    selected: "false"
  },
  {
    name: "Pepper",
    selected: "false"
  },
  
];

db.Ingredient
  .remove({})
  .then(() => db.Ingredient.collection.insertMany(ingredientSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
