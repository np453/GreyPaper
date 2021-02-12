var mongoose = require('mongoose');

//model for carousel data
const Carousel = new mongoose.Schema({
    fileRoute : String,

});

module.exports = mongoose.model("BannerCarousel",Carousel);