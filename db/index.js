/* Mongo Database
* - this is where we set up our connection to the mongo database
*/
const mongoose = require('mongoose');
// const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let MONGO_URL;
const MONGO_LOCAL_URL = 'mongodb://localhost/recipelist';

if (process.env.MONGODB_URI) {
        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
        MONGO_URL = process.env.MONGODB_URI;
  } else {
        mongoose.connect(MONGO_LOCAL_URL, { useNewUrlParser: true }); // local mongo url
        MONGO_URL = MONGO_LOCAL_URL;
  }

// should mongoose.connection be put in the call back of mongoose.connect???
  const db = mongoose.connection;
  db.on('error', err => {
      console.log(`There was an error connecting to the database: ${err}`);
  });
  
  db.once('open', () => {
      console.log(`You have successfully connected to your mongo database: ${MONGO_URL}`);
});

// // Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

// var MongoClient = require('mongodb').MongoClient,
//    Logger = require('mongodb').Logger,
//    assert = require('assert');

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

module.exports = db;