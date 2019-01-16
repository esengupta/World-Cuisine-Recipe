// import api routes and express router
const router = require("express").Router();
const recipeRoutes = require("./recipes");
const ingredientsRoutes = require("./ingredients");
const recipeApiRoutes = require("./recipeApi");
const favesRoutes = require("./faves");


const searchRoutes = require("./recipesearch");

// prefix book route endpoint with "/book"
//Routes
router.use("/recipe", recipeRoutes);
router.use("/ingredients", ingredientsRoutes);
router.use("/apirecipes", recipeApiRoutes);
router.use("/faves", favesRoutes);
router.use("/search", searchRoutes);

// export routes
module.exports = router;