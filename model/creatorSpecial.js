var mongoose = require('mongoose');

//model for creator special(CS) section
const CS = new mongoose.Schema({
    name : String,
    description : String,
    quantity : String,
    price : String,
    fileRoute : String,
    slug : String

});

module.exports = mongoose.model("creatorSpecial", CS);