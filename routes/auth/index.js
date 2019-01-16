const router = require("express").Router();
const express = require('express');
const passport = require('../../passport');
const userController = require('../../controllers/userController');
// const favesRoutes = require("./faves");


// prefix book route endpoint with "/book"
//Routes

router.get('/user',userController.getUser);
// Perform the login, after login Auth0 will redirect to callback
router.get('/login', passport.authenticate('auth0', {
    scope: 'openid email profile'
  }), function (req, res) {
    res.redirect('/');
  });

//  userController.auth,passport.authenticate('local'),userController.authenticate);
router.post('/logout', userController.logout);
router.post("/signup", userController.register);


// export routes
module.exports = router;