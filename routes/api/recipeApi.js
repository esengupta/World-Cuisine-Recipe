// import express Router and the recipe controller
const router = require("express").Router();
const axios = require("axios");
const keys = require("../../keys");

const appID = keys.edamam.id;
const appKey = keys.edamam.key;

// Matches with "/api/recipeApi"
router
  .get("/:query", function (req, res) {
    // console.log('this is called too');
    // console.log(req.params.query);
    const url = `https://api.edamam.com/search?${req.params.query}&app_id=${appID}&app_key=${appKey}&to=100`;
    // console.log(url);

    axios
      .get(url)
      .then(function(results) {
        // console.log(results.data)
        res.json(results.data)
      })
      .catch(function (err) {
        console.log(err);
        res.status(422).json(err)
      });

  });

module.exports = router;