const router = require('express').Router();
const mail = require('../model/subscriber-list');

//post route for email subscription
// Pre initialized mongo document required

router.post('/' , async( req, res ) => {

    const data = await mail.find({ emails : { $exists:true } });
    try {
        mail.findByIdAndUpdate(data._id, { $push: {
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


// get route for email data
router.get('/', async(req, res) => {
const allcontacts = await mail.find({ })
// const contacts = [];
// for(let i=0;i<allcontacts[0].emails.length;i++) {
// contacts.push( {_id:allcontacts[0].emails[i]._id,route:"contact",email:allcontacts[0].emails[i].email} )
// }
res.send(allcontacts)

});

router.put('/delete/:id', async (req, res) => {
    const allcontacts= await mail.find({ })
    const data = await mail.update({_id:allcontacts[0]._id}, { '$pull' : { "emails" : { "_id" : req.params.id } } } )
    res.status(200).send("deleted");
});


module.exports = router;