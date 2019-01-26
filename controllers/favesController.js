// import our Book model
const db = require("../models");

// export a set of methods to edit and manipulate the recipes controller

module.exports = {

  findByUser: function (req, res) {
    console.log("Fave findByUser");
    console.log(req.params);
    db.Recipe
      .find(req.params)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  removeFav: function (req, res) {
    console.log("Fave removeFav");
    console.log(req.params);
    db.Recipe
      .findOneAndDelete(req.params)
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log(err);
        res.status(422).json(err)
      });

  },

  searchFav: function (req, res) {
    console.log("Fave findBySearch");
    console.log(req.params);

    let regex = new RegExp(req.params.query);
    // let regex = new RegExp('chicken');
    let query = {};
    query.username=req.params.username;
    query.ingredients = regex;

    db.Recipe
      .find(query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  createFav: function (req, res) {
    // console.log("---in favs Controller---");
    // console.log(req.body, "Save this Recipe");
    db.Recipe
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err =>
        // console.log(err);
        res.status(422).json(err)
      );
  },





  // find all books ("/api/book" => GET)
  findAll: function (req, res) {
    // /api/book?title=harry+potter
    // req.query => {title: "harry potter"}
    console.log("req.params".req.params)
    db.Faves
      .find({ usename: req.params.username })
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

  },

  // find a book by id ("/api/book/:id")
  findById: function (req, res) {
    db.Faves
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err =>
        // console.log(err);
        res.status(422).json(err)
      );
  },

  // create / insert new book ("/api/book" => POST)
  create: function (req, res) {
    console.log("--in favs controller--");
    console.log(req.body, "save this recipe");
    db.Faves
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err =>
        // console.log(err);
        res.status(422).json(err)
      );
  },

  // update book information ("/api/book/:id" => PUT)
  update: function (req, res) {
    db.Faves
      // .findOneAndUpdate({ _id: req.params.id }, req.body)
      .findOneAndUpdate({ _id: req.params.id }, { $set: { selected: true } }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err =>
        // console.log(err);
        res.status(422).json(err)
      );
  },

  // to delete a book from the reading list ("/api/book/:id" => DELETE)
  remove: function (req, res) {
    db.Faves
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err =>
        // console.log(err);
        res.status(422).json(err)
      );
  }
};