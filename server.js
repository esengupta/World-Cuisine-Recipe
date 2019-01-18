var dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
// const mongoose = require("mongoose");
const cors = require("cors");
// const dbConnection = require("./server/db");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
var session = require('express-session');

// Load Passport
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// config express-session
var sess = {
  secret: 'BananaSeedMatrix234',
  cookie: {},
  resave: false,
  saveUninitialized: true
};

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3001/auth/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  sess.cookie.secure = true; // serve secure cookies, requires https
}

app.use(session(sess));
app.use(cors());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/recipelist");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
