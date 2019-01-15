const router = require("express").Router();
const express = require('express');
const passport = require('../../passport');
const userController = require('../../controllers/userController');
// const favesRoutes = require("./faves");


// prefix book route endpoint with "/book"
//Routes
router.get('/user',userController.getUser);
router.post('/login', userController.auth,passport.authenticate('local'),userController.authenticate);
router.post('/lohout', userController.logout);
router.post("/signup", userController.register);


// export routes
module.exports = router;