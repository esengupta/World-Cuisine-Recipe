/* Mongo Database
* - this is where we set up our connection to the mongo database
*/
// const mongoose = require('mongoose');
// // const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// let MONGO_URL;
// const MONGO_LOCAL_URL = 'mongodb://localhost/recipelist';

// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

// var MongoClient = require('mongodb').MongoClient
//   , Logger = require('mongodb').Logger
//   , assert = require('assert');

// // Connection URL
// var url = 'mongodb://localhost:27017/myproject';
// // Use connect method to connect to the Server
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server");

//   // Set debug level
//   Logger.setLevel('debug');
  
//   // Set our own logger
//   Logger.setCurrentLogger(function(msg, context) {
//     console.log(msg, context);
//   });

//   // Insert a single document
//   db.command({ismaster:true}, function(err, d) {
//     assert.equal(null, err);
//     db.close();
//   });
// });

// module.exports = db;