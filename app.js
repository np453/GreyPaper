const dotenv = require('dotenv');
require('dotenv').config();

const express= require('express');
const app= express();
const multer = require('multer')
const cors = require('cors');
const AWS = require('aws-sdk');
const passport = require('passport');
const mongoose = require('mongoose');
const mongodb = require("mongodb");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const cookieSession = require('cookie-session')

const path = require('path');

const payment = require('./routes/payment');
const email = require('./routes/email');
const design = require('./routes/upload');
const getUser = require('./routes/getUser');

require('./routes/auth.js'); 

const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/greyPaper";

MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) throw err;
  var dbo = db.db("greyPaper");
  dbo.createCollection("subscribers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});



//Port
const PORT = 6161;

//.env file
dotenv.config();


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

app.use(passport.initialize());
app.use(passport.session());
// app.use(cookie());

app.use('/subscribers-list',email);
app.use('/payment', payment);
app.use('/designupload', design);
app.use('/get-user', getUser);


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
   