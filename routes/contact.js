/* This file control the model of the contact page */

var express = require('express'),
    app = express();
    
    //Render the page of contact
    app.get('/', function(req,res){
        res.render('contact');
    });
    
    module.exports = app;