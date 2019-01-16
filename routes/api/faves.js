// import express Router and the recipe controller
const router = require("express").Router();
const favesController = require("../../controllers/favesController");

// Matches with "/api/faves
router
  .route("/")
  // .get(recipesController.findAll)
  .post(favesController.create);

// Matches with "/api/book/:id"
router
  .route("/:id")
  .get(favesController.findById)
  .put(favesController.update)
  .delete(favesController.remove);

  // Matches with "/api/faves/:id"

  router.route('/username/:username').get(favesController.findAll);


module.exports = router;