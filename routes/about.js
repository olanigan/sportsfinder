var express = require('express'),
    app = express();
    
    
    app.get('/', function(req,res){
        res.render('about');
   
    });
    
    module.exports = app;