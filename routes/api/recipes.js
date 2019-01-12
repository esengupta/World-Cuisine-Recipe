// import express Router and the recipe controller
const router = require("express").Router();
const recipesController = require("../../controllers/recipesController");

// Matches with "/api/recipes"
router
  .route("/")
  .get(recipesController.findAll)
  .post(recipesController.create);

// Matches with "/api/book/:id"
router
  .route("/:id")
  .get(recipesController.findById)
  .put(recipesController.update)
  .delete(recipesController.remove);

module.exports = router;