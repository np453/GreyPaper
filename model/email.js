const mongoose = require('mongoose');

//model for each email
const email = new mongoose.Schema({
    email:String
})

//model for the email array containing every email
const mail = new mongoose.Schema({
    emails:[email]
})

module.exports = mongoose.model('mail', mail);