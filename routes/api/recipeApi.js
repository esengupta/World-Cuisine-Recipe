// import express Router and the recipe controller
const router = require("express").Router();
const axios = require("axios");

// Matches with "/api/recipes"
router
  // .route("/")
// .post(recipesController.create);
  .get("/", (req,res) => {
    console.log('this is called too');
  
  // .route("/:id")
  // console.log(`http://www.recipepuppy.com/api/?i=${req.query.ingredient}`)
axios
  .get(`http://www.recipepuppy.com/api/?i=${req.query.ingredient}`) //, {params: req.query})
  .then((results) => res.json(results.data.results))
  .catch(err => 
        // console.log(err);
        res.status(422).json(err));

  });

module.exports = router;