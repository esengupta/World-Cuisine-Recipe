// import api routes and express router
const router = require("express").Router();
const apiRoutes = require("./api");

// prefix book route endpoint with "/book"
//Routes
router.use("/api", apiRoutes);

// export routes
module.exports = router;