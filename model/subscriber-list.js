const mongoose = require('mongoose');


//locale date and time
const date= new Date;
const localeDate= date.toLocaleDateString();
const localeTime= date.toLocaleTimeString();

const designUpload = new mongoose.Schema({
    filename:String,
    dateOfUpload : { type:String, default : localeDate } ,
    timeOfUpload : { type:String, defualt : localeTime }

})

//model for each email
const email = new mongoose.Schema({
    email:String
})

//model for the email array containing every email
const mail = new mongoose.Schema({
    emails:[email],
    design:[designUpload]
})



module.exports = mongoose.model('subscriberlist', mail);