/* CLEANED AND COMMENTED */
/* This file controls the model of the facilities*/

var express = require('express'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    app = express();
    
require('./main');

//Create a new schema for the data that we have in the database
var facilitySchema = new Schema({
    'ID':Number,
    'Name':String,
    'Type':String,
    'Code':Number,
    'Municipality':String,
    'X-Euref':Number,
    'Y-Euref':Number,
    'X-WGS84':Number,
    'Y-WGS84':Number
});

//Connection with the model 
var Facility = mongoose.model('Facility', facilitySchema,'facility');


//GET the main website
app.get('/', function(req,res){
    Facility.distinct("Type", function(err,types){
        if(err){
            console.log(err);
            res.send(501);
        }
        types.sort({Type:1});
         res.render('main',{types:types});
    });
});

//GET the coordinates for the map and return them in JSON
app.get('/map.json',function(req, res) {
    Facility.find({Code:1340},{Name:1, Type:1, "XWGS84": 1, "YWGS84": 1,"_id":0 },function(err,cordinates){
        if(err){
            console.log(err);
            res.send(501);
        }
        res.json(cordinates);
    });
});

//GET the facilities by the type
app.get('/type/:type', function(req,res){
    var type = req.params.type;
    console.log(type);
    Facility.find({Type:type},{Name:1, XWGS84: 1, YWGS84: 1,"_id":0 ,Type:1}, function(err,types){
        if(err){
            console.log(err);
            res.send(501);
        }
        console.log(types);
        res.json(types);
    });
});

//GET the facilities and return them in JSON.
app.get('/type', function(req,res){
    Facility.distinct("Type", function(err,types){
        if(err){
            console.log(err);
            res.send(501);
        }
        res.json(types);
    });
});

//GET and Render the map
app.get('/map',function(req, res) {
    res.render('map');
});


module.exports = app;