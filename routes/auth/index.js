const router = require('express').Router();
const express = require('express');
const userController = require('../../controllers/userController');
const secured = ('../../middleware/secured');
let user = null;
// const favesRoutes = require("./faves");

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://esengpta.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://esengpta.auth0.com/api/v2/',
  issuer: `https://esengpta.auth0.com/`,
  algorithms: ['RS256']
});

//Routes
router.get('/user', function(req, res){
  console.log('login as user');
  if (req.user){
    res.json(req.user);
  } else {res.redirect('http://localhost:3001/auth/login')}
});
// Perform the login, after login Auth0 will redirect to callback
router.get('/login', checkJwt, function (req, res, next) {
  // passport.authenticate('auth0', {
  //   scope: 'openid email profile'
  // })
    console.log('/login hit')
    res.redirect('/');
  });

//  userController.auth,passport.authenticate('local'),userController.authenticate);
router.get('/logout', (req, res) => {
  req.logOut();
  console.log('/logout done')
  // passport.deserializeUser(req.user, function(){
  //   res.redirect('http://localhost:3000')//'/');
  // });
  
  res.redirect('http://localhost:3000')//'/');
});
// router.post("/signup", userController.register);


// export routes
module.exports = router;