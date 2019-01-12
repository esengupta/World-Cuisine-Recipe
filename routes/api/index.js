// import api routes and express router
const router = require("express").Router();
const recipeRoutes = require("./recipes");
// const ingredientsRoutes = require("./ingredients");
// const bookRoutes = require("./book");

// prefix book route endpoint with "/book"
//Routes
router.use("/recipe", recipeRoutes);
// router.use("/ingredients", ingredientsRoutes);

// export routes
module.exports = router;