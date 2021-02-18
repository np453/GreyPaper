const router = require('express').Router();
const multer = require('multer')

const mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;

let url = "mongodb://localhost:27017/greyPaper";


const storageCarousel = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'media/carousel')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const uploadCarousel = multer({ storage: storageCarousel }).single('file');

const storageCreatorSpecial = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'media/CreatorSpecial')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const uploadCreatorSpecial = multer({ storage: storageCreatorSpecial }).single('file');

const storageHighestRatings = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'media/HighestRatings')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const uploadHighestRatings = multer({ storage: storageHighestRatings }).single('file');


//items storage
const ItemStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'media/CreatorSpecial')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
// const uploadCreatorSpecial = multer({ storage: storageCreatorSpecial }).single('file');

module.exports = {
    url : url,
    ApiClient : MongoClient,
    uploadCarousel : uploadCarousel,
    uploadCreatorSpecial : uploadCreatorSpecial,
    uploadHighestRatings : uploadHighestRatings
}