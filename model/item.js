const mongoose = require('mongoose');

const itemImage = new mongoose.Schema({
    slug : String
})

const item = new mongoose.Schema({
    name : String,
    description : String,
    image : [itemImage],
    cost : String,
    quantity : String,
    category : String,
    material : String,
    size : String,
    designation : String,
    slug : String,
    discount : String,
    onSale : false,
    totalSold : String,
    shareUrl : String
})

module.exports = mongoose.model('Items', item);