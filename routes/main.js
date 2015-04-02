/* This file include the connection to the data base */
/* Show an event in the log if successful or not*/

var express = require('express'),
    mongoose = require('mongoose');
    

mongoose.connect('mongodb://localhost/mydb', function (error) {
 if (error) {
     console.log('Cannot connect due to %s',error);
     return;
 }
 console.log('Mongo DB connected');
});

