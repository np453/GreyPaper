var mongoose = require('mongoose');

//model for carousel data
const Carousel = new mongoose.Schema({
    designation : String,
    fileRoute : String,

});

module.exports = mongoose.model("Carousel", Carousel);