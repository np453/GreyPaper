var mongoose = require('mongoose');

//model for carousel data
const Category = new mongoose.Schema({
    name : String,
});

module.exports = mongoose.model("Category",Category);