const mongoose = require('mongoose');

const fav = new mongoose.Schema({
    productId:String,
})

const kind = new mongoose.Schema({
    provider: String,
    id:String
})

const recentOrders = new mongoose.Schema({
    productId:String,
    paymentMethod:String,
    amount:String,
    orderDate:String,
    deliveryAdd:String,
    quantity:String,
    rname:String,
    rphn:String
})

const address = new mongoose.Schema({
    name:String,
    phn:String,
    city:String,
    pin:String,    
    flatNo:String,
    area:String,     
    landmark:String, //near...
    state:String,
    addressType:String

})

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

const User = new mongoose.Schema({
    uname:String,
    dname:String,
    email:String,
    profileImg:String,
    password:String,
    phn:String,
    kind:[kind],
    resetOtp:String,
    fav:[fav],
    designUploads : [designUpload],
    recentOrders:[recentOrders],
    address:[address],
    theme:String,                //light or dark theme
    access:String               // buyer, seller, admin

})


module.exports = mongoose.model('User', User);