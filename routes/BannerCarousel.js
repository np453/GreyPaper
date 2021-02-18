const router = require('express').Router();
const Carousel = require('../model/BannerCarousel');
const Apidata = require('../helperFiles/ApiData');

// post route for carousel
router.post('/', Apidata.uploadBannerCarousel , async(req, res) => {

        const carouselItem = new Carousel({ fileRoute:req.file.filename })
        const savedCarouselItem = await carouselItem.save()
        res.send(savedCarouselItem)
        
        return res.status(200).send(req.file)
});

//Get route for carousel
router.get('/', async(req, res) => {
    const BannerCarousels = await Carousel.find({ })
    res.send( BannerCarousels )
});


module.exports = router;