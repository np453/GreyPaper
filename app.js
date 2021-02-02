//for reading environment variables
const dotenv = require('dotenv');
dotenv.config();

const express= require('express');
const path = require('path');

//create express app
const app= express();

//for cross browser access
const cors = require('cors');

//for SES configuration
const AWS = require('aws-sdk');

//login system library
const passport = require('passport');

//to parse json data
const bodyParser = require('body-parser');

//cookie libraries
const cookieParser = require('cookie-parser'); 
const cookieSession = require('cookie-session')

const fileupload = require("express-fileupload");

//database libraries
const mongoose = require('mongoose');
const mongodb = require("mongodb");

//routes
const payment = require('./routes/payment');
const email = require('./routes/email');
const design = require('./routes/upload');
const getUser = require('./routes/getUser');
const filter = require('./routes/filter');

//Port
const PORT = 6161;

//importing login system
require('./routes/auth.js'); 

//mongodb install on system required to declare a mongoClient
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/greyPaper";

//creating the database (using mongodb version 3.3.3, to fix createCollection error)
MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

//creating a collection
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) throw err;
  var dbo = db.db("greyPaper");
  dbo.createCollection("subscribers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) throw err;
  var dbo = db.db("greyPaper");
  dbo.createCollection("designs", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});

app.use('*', function(req, res, next) {
//replace localhost:8080 to the ip address:port of your server
res.header("Access-Control-Allow-Origin", "http://localhost:6161");
res.header("Access-Control-Allow-Headers", "X-Requested-With");
res.header('Access-Control-Allow-Headers', 'Content-Type');
res.header('Access-Control-Allow-Credentials', true);
next(); 
});

//enable pre-flight
app.options('*', cors());

//Middlewaress
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))
app.use(fileupload());

//login system middleware
app.use(passport.initialize());
app.use(passport.session());
// app.use(cookie());


//routes
app.use('/subscribers-list',email);
app.use('/payment', payment);
app.use('/designupload', design);
app.use('/get-user', getUser);
app.use('/upload', filter)


// connect to DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Database is connected!"));

app.get('/success', (req, res) => {
  console.log('success');
  res.send('success')
})

//logout api
app.get('/logout', function(req, res){
  
  req.logout();
  console.log("Logged out!!")
  return res.redirect('/');
});

//google login routes
app.get('/google/login',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

//callback route
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.cookie("user",req.user._id);
  res.redirect('/home');
});

//facebook login routes
app.get('/facebook/login', passport.authenticate('facebook', { scope : 'email' } ));

//facebook callback route
app.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login' }), (req, res) => {
  res.cookie("user",req.user._id);
  res.redirect('/home');
});


app.use(express.static('client/build'));

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.listen(PORT, function() {
      console.log('App running on port 6161');
  }); 
   