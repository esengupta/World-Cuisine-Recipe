// import express Router and the recipe controller
const router = require("express").Router();
const axios = require("axios");

// Matches with "/api/recipes"
router
  // .route("/")
  .get("/", (req,res) => {
    console.log('this is called too')
  // .post(recipesController.create);

// Matches with "/api/book/:id"
axios
  // .route("/:id")
  .get("http://www.recipepuppy.com/api/", {params: req.query})
  .then(({data: { result }}) => res.json(results))
  .catch(err => 
        // console.log(err);
        res.status(422).json(err));

  // .put(recipesController.update)
  // .delete(recipesController.remove);
  });

module.exports = router;