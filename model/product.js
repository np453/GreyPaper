const mongoose = require('mongoose');

const product = new mongoose.Schema({
    uname:String,
    dname:String,
    email:String,
    phn:String,
    kind:String,
    fav:[]

})


module.exports = mongoose.model('subscriberlist', mail);