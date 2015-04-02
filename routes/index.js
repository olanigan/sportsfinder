/* CLEANED AND COMMENTED */

/* This file contains the model for the main frontpage*/

var express = require('express');
var router = express.Router();
//var Facility = require('facility');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
