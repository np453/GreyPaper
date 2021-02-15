const router = require('express').Router();
const Carousel = require('../model/BannerCarousel');
const Apidata = require('../helperFiles/ApiData');

// post route for carousel
router.post('/', Apidata.uploadBannerCarousel , async(req, res) => {

    Apidata.ApiClient.connect(Apidata.url, function(err, db) {

        if (err) throw err;
        const dbo = db.db("greyPaper");
        const myobj = { fileRoute:Date.now() + '-' + req.file.filename };

        dbo.collection("banner-carousel").insertOne(myobj, function(err, res) {
          if (err) throw err;
          db.close(); 
        });

      });

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