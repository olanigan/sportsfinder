var express = require('express'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    app = express();

require('./main');


var eventSchema = new Schema({
    'ID':Number,
    'Title':String,
    'Description':String,
    'Date_':Date,
    'Place':String,
    'Address':String,
    'Access':Boolean,
    'MaxGuest':Number,
    'Password':String,
    'Created_at': Date
});

var Event = mongoose.model('Event', eventSchema,'Events');


//Render the main page with events
app.get('/',function(req, res) {
    Event.find({}, function (err, events){
        if(err){
            console.log(err);
            res.render(501);
        }
        res.render('event3',{events:events});
    });
});

//Get all events
app.get('/all', function(req,res){
   
    Event.find({}, {_id:0,Password:0, __v:0, Created_at:0}, function(err,events){
        if(err){
            console.log(err);
            res.send(501);
        }
        res.json(events);
    });
});


//Gives the number with which you can edit the event
app.get('/edit/:id',function(req, res) {
    var id = req.params.id;
    console.log("Your id is %s",id);
    Event.find({_id: id}, function (err, events){
        if(err){
            console.log(err);
            res.render(501);
        }
        console.log(events.Title);
        res.render('editEvent3',{events:events});
    });
});

//Create events
app.get('/new',function(req, res) {
    res.render('newEvent');
});

//Render the page for editing the events
app.post('/auth',function(req, res) {
 
    var passw = req.body.pass;
    var id = req.body.editId;
    console.log("Pass & Id: " + passw + '// ' + id);
    //if(req.params.Password == passw){
          console.log("AUTH VALUE " + req.body.pass);
   // console.log("ID to be edited is %s",id);
    Event.find({'_id': id,'Password': passw}, function (err, events){
        if(err){
             console.log("the password is incorrect");
             res.send('Your password is incorrect <br/> <a href="/event">Return to Events page</a>');
        }else if(events.length == 0){
           console.log("the password is incorrect " + events.length);
             res.send('Your password is incorrect <br/> <a href="/event">Return to Events page</a>');
        }else{
             console.log("Count: "+ events.length);
            res.render('editEvent3',{events:events});
        }
         
    });
        
   // }else{
      //  console.log("the password is incorrect");
      // res.send('Your password is incorrect <br/> <a href="/event">Return to Events page</a>');
   // }
  
});

//Register the events
app.post('/', function(req, res) {
   console.log(req.body);
   var cre = Date.now();
    new Event({
        Title : req.body.title,
        Description : req.body.desc,
        Date_: req.body.date,
        Place: req.body.place,
        Address: req.body.address,
        Access: req.body.access, 
        MaxGuest:req.body.maxguest,
        Password:req.body.password,
        Created_at :cre
    }).save( function(err){
        if(err){
            console.log(err);
            res.render(501);
        }
        Event.find({"Created_at":cre}, {_id:1}, function(err,events){
            if(err){
                console.log(err);
                res.send(501);
            }
            res.send('Your password is: '+ req.body.password + '<br/> <a href="/event">Return to Events page</a>');
        });
    });
 });


 //Edit part
app.post('/:id', function(req, res){
    var id = req.param("id");
     console.log("ID to be edited is %s", id);
     Event.findById(id,function(err,event){
         
         if(err){
             console.log("Can't find ");
             res.send(err + '<br/>Soorry Mate, Try again later :p <br/> <a href="/event">Back to Event</a>');
         } 
         if(!event){
             console.log("No such event");
             res.send('there is not such an event <br/> <a href="/event">Back to Event</a>');
         }else{
             console.log(req.body.title + "" + req.body.desc);
            if(req.body.title) event.Title = req.body.title;
            if(req.body.desc) event.Description = req.body.desc;
            if(req.body.date) event.Date_= req.body.date;
            if(req.body.place) event.Place= req.body.place;
            if(req.body.address) event.Address= req.body.address;
            if(req.body.access) event.Access= req.body.access; 
            if(req.body.maxguest) event.MaxGuest=req.body.maxguest;
            if(req.body.password) event.password=req.body.password;
            
            event.save(function(err){
                if(err) res.send('Update Failed <a href="/event">Back to Event</a>')
                else
                    res.send('Successful!!! <a href="/event">Back to Event</a>');
            });
         }
     });
 });

// DELETE EVENT OPERATION
 app.get('/delete/:id', function(req, res){
    var id = req.param("id");
     console.log("ID to be deleted is %s", id);
     Event.remove({ _id : id}, function(err){
         if(err){
            console.log(err);
            res.send("Delete failed miserably, Now go and cry about your sins");
        }
        console.log("Delete is supposed to work");
         Event.find({}, function(err,events){
        if(err){
            console.log(err);
            res.send(501);
        }
       
        res.render('event3',{events:events});
    });
     });
     
 });

module.exports = app;