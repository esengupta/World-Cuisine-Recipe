// import express Router and the recipe controller
const router = require("express").Router();
const ingredientsController = require("../../controllers/ingredientsController");

// Matches with "/api/ingredients"
router
  .route("/")
  .get(ingredientsController.findAll)
  .post(ingredientsController.create)
  .put(ingredientsController.updateMany);

// Matches with "/api/book/:id"
router
  .route("/:id")
  .get(ingredientsController.findById)
  .put(ingredientsController.update)
  .delete(ingredientsController.remove);


  // Matches with "/api/ingredients/:id"

  router.route('/username/:username').get(ingredientsController.findAll);


module.exports = router;