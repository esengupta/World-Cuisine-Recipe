// import express Router and the recipe controller
const router = require("express").Router();
const recipesController = require("../../controllers/recipesController");
const favesController = require("../../controllers/favesController");

// Matches with "/api/recipe"
router
  .route("/user/:username/uri/:uri")
  .delete(favesController.removeFav);

router
  .route("/user/:username/query/:query")
  .get(favesController.searchFav);

router
  .route("/user/:username")
  .get(favesController.findByUser);

router
  .route("/:id")
  .get(recipesController.findById)
  .put(recipesController.update)
  .delete(recipesController.remove);

router
  .route("/")
  .get(recipesController.findAll)
  .post(recipesController.create);

module.exports = router;