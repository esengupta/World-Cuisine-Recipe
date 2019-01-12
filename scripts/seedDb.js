const mongoose = require("mongoose");
const db = require("../models");

//This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/reactreadinglist"
);

const ingredientSeed = [
  {
    name: "Salt",
    selected: ""
  },
  {
    name: "Sugar",
    selected: ""
  },
  {
    name: "Eggs",
    selected: ""
  },
  {
    name: "Bread",
    selected: ""
  },
  {
    name: "Oregano",
    selected: ""
  },
  {
    name: "Tuna",
    selected: ""
  },
  {
    name: "Ground-Turkey",
    selected: ""
  },
  {
    name: "Oatmeal",
    selected: ""
  },
  {
    name: "Butter",
    selected: ""
  },
  {
    name: "Flour",
    selected: ""
  },
  {
    name: "Peas",
    selected: ""
  },
  {
    name: "Tomatoes",
    selected: ""
  },
  {
    name: "Crushed Garlic",
    selected: ""
  },
  {
    name: "Cream of Mushroom Soup",
    selected: ""
  },
  {
    name: "Spaghetti Noodles",
    selected: ""
  },
  {
    name: "Chicken",
    selected: ""
  },
  {
    name: "Mixed Vegetable",
    selected: ""
  },
  {
    name: "Pepper",
    selected: ""
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
