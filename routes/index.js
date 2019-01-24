// import express Router, path module (built into node), our api routes
const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');
const authRoutes = require('./auth');



// prefix api routes with "/api"
router.use('/api', apiRoutes);

// prefix api routes with "/api"
router.use('/auth', authRoutes);


// if no routes are hit, send the client's homepage (only to be used in production)
router.get(function(req,res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;