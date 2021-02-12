var mongoose = require('mongoose');

//model for creator special(CS) section
const highestRatings = new mongoose.Schema({
    name : String,
    price : String,
    fileRoute : String,
    slug : String

});

module.exports = mongoose.model("HighestRatings", highestRatings);