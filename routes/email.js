const router = require('express').Router();
const mail = require('../model/email');

//post route for email subscription
// Pre initialized mongo document required

router.post('/' , async(req,res)=>{
    const data=await mail.find({});
    mail.findByIdAndUpdate({_id:data[0]._id},  //Pushing each email element in the array
        { $push: {
                emails:{
                    "email":req.body.email,
                }
            }
        }).exec()

    res.send(data)
})


// get route for email data
router.get('/', async(req, res) => {
const allcontacts = await mail.find({ })
const contacts = [];
for(let i=0;i<allcontacts[0].emails.length;i++) {
contacts.push( {_id:allcontacts[0].emails[i]._id,route:"contact",email:allcontacts[0].emails[i].email} )
}
res.send(contacts)

});

router.put('/delete/:id', async (req, res) => {
    const allcontacts= await mail.find({ })
    const data = await mail.update({_id:allcontacts[0]._id}, { '$pull' : { "emails" : { "_id" : req.params.id } } } )
    res.status(200).send("deleted");
});


module.exports = router;