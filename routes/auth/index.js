const router = require('express').Router();
const express = require('express');
const passport = require('passport');
const userController = require('../../controllers/userController');
const secured = ('../../middleware/secured');
// const favesRoutes = require("./faves");

// passport.initialize();
// prefix book route endpoint with "/book"
//Routes
router.get('/user', function(req, res){
  if (req.user){
    res.json(req.user);
  } else {res.redirect('http://localhost:3001/auth/login')}
});
// Perform the login, after login Auth0 will redirect to callback
router.get('/login', passport.authenticate('auth0', {
    scope: 'openid email profile'
  }), function (req, res) {
    res.redirect('/');
  });

//  userController.auth,passport.authenticate('local'),userController.authenticate);
router.get('/logout', (req, res) => {
  req.logOut();
  passport.deserializeUser(req.user, function(){
    res.redirect('http://localhost:3000')//'/');
  })
});

router.get('/callback', function (req, res, next) {
  passport.authenticate('auth0', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/auth/login'); }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      const returnTo = req.session.returnTo;
      delete req.session.returnTo;
      res.redirect(returnTo || '/auth/user');
    });
  })(req, res, next);
});
// router.post("/signup", userController.register);


// export routes
module.exports = router;