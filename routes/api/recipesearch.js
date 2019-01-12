const axios = require("axios");
const router = require("express").Router();

// Matches with "/api/recipes/search"
router.get("/", (req, res) => {
  console.log("this hit")
  axios
    .get("http://www.recipepuppy.com/api/", { params: req.query })
    .then(({ data: { results } }) => res.json(results))
    .catch(err => {
      console.log(err);  
      res.status(422).json(err)
    });
});

module.exports = router;
