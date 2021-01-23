const router = require('express').Router();
const mail = require('../model/subscriber-list');

const mongodb = require("mongodb");

var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/greyPaper";

//post route for email subscription
// Pre initialized mongo document required

router.post('/' , async( req, res ) => {
    

    const data = await mail.find({ emails : { $exists:true } });
    // console.log(data[0]._id)
    try {
        mail.findByIdAndUpdate(data[0]._id, { $push: {
            emails:{
                "email":req.body.email,
            }
        }
        }).exec()

        return res.status(200).send("Email registered!!")
    }catch (err) {
        res.status(400).send(err);
    }
        
    res.send(data)
})

// router.post('/' , async( req, res ) => {
//     const findSubscribersList = async() => {

//     }
//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db("greyPaper");
//         var myobj = { email:req.body.email };
//         dbo.collection("subscribers").insertOne(myobj, function(err, res) {
//           if (err) throw err;
//           console.log("email registered");
//           db.close();
//         });
//       });
// })


// get route for email data
router.get('/', async(req, res) => {
const allcontacts = await mail.find({ })
const contacts = [];
for(let i=0;i<allcontacts[0].emails.length;i++) {
contacts.push( {_id:allcontacts[0].emails[i]._id,route:"contact",email:allcontacts[0].emails[i].email} )
}
res.send(allcontacts)

});

router.put('/delete/:id', async (req, res) => {
    const allcontacts= await mail.find({ })
    const data = await mail.update({_id:allcontacts[0]._id}, { '$pull' : { "emails" : { "_id" : req.params.id } } } )
    res.status(200).send("deleted");
});


module.exports = router;