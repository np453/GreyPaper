const router = require('express').Router();
const Carousel = require('../model/carousel');
const Apidata = require('../helperFiles/ApiData');

// post route for carousel
router.post('/', Apidata.uploadCarousel , async(req, res) => {

        //Carousel item    
        const carouselItem = new Carousel({
            designation:req.body.designation,
            fileRoute:req.file.filename 
        })
        //saving caroussel item
        const savedCarouselItem = await carouselItem.save()
        res.send(savedCarouselItem)
        
        return res.status(200).send(req.file)
});

//Get route for carousel
router.get('/', async(req, res) => {
    const Carousels = await Carousel.find({ })
    res.send( Carousels )
});


module.exports = router;