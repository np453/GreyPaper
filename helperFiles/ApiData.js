const router = require('express').Router();
const multer = require('multer')
const Carousel = require('../model/BannerCarousel');

const mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;

let url = "mongodb://localhost:27017/greyPaper";


const storageBannerCarousel = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'media/BannerCarousel')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const uploadBannerCarousel = multer({ storage: storageBannerCarousel }).single('file');

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


module.exports = {
    url : url,
    ApiClient : MongoClient,
    uploadBannerCarousel : uploadBannerCarousel,
    uploadCreatorSpecial : uploadCreatorSpecial,
    uploadHighestRatings : uploadHighestRatings
}