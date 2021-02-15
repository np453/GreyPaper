const router = require('express').Router();
const HighestRatings = require('../model/HighestRatings');
const Apidata = require('../helperFiles/ApiData');

// post route for creator special
router.post('/', Apidata.uploadHighestRatings , async(req, res) => {

    Apidata.ApiClient.connect(Apidata.url, function(err, db) {

        if (err) throw err;
        const dbo = db.db("greyPaper");
        const myobj = { fileRoute : Date.now() + '-' + req.file.filename };

        dbo.collection("highest-ratings").insertOne(myobj, function(err, res) {
          if (err) throw err;
          db.close(); 
        });

      });

        const HighestRatingsItem = new HighestRatings({ name:req.file.filename, fileRoute:req.file.filename })
        const savedHighestRatingsItem = await HighestRatingsItem.save()
        res.send(savedHighestRatingsItem)
        
        return res.status(200).send(req.file)
});

//Get route for creator special
router.get('/', async(req, res) => {
    const HighestRatingsItems = await HighestRatings.find({ })
    res.send( HighestRatingsItems )
});


module.exports = router;