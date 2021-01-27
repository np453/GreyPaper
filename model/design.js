const mongoose = require('mongoose');

//locale date and time
const date= new Date;
const localeDate= date.toLocaleDateString();
const localeTime= date.toLocaleTimeString();

const designUpload = new mongoose.Schema({
    file : {
        filename : String,
    },
    dateOfUpload : { type:String, default : localeDate } ,
    timeOfUpload : { type:String, defualt : localeTime }

})


module.exports = mongoose.model('userdesign', designUpload);