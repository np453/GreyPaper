const router = require('express').Router();
const creatorSpecials = require('../model/creatorSpecial');
const Apidata = require('../helperFiles/ApiData');

// post route for creator special
router.post('/', Apidata.uploadCreatorSpecial , async(req, res) => {

    Apidata.ApiClient.connect(Apidata.url, function(err, db) {

        if (err) throw err;
        const dbo = db.db("greyPaper");
        const myobj = { fileRoute : Date.now() + '-' + req.file.filename };

        dbo.collection("creator-special").insertOne(myobj, function(err, res) {
          if (err) throw err;
          db.close(); 
        });

      });

        const creatorSpecialtItem = new creatorSpecials({ name:req.file.filename, fileRoute:req.file.filename })
        const savedcreatorSpecialtItem = await creatorSpecialtItem.save()
        res.send(savedcreatorSpecialtItem)
        
        return res.status(200).send(req.file)
});

//Get route for creator special
router.get('/', async(req, res) => {
    const creatorSpecialtItems = await creatorSpecials.find({ })
    res.send( creatorSpecialtItems )
});


module.exports = router;