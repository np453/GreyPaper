const router = require('express').Router();

const multer = require('multer');

const User = require('../model/user');
const mail = require('../model/subscriber-list');


//multer for image storage in public folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'client/public/media/designs')
    },
    filename: function (req, file, cb) {
      cb(null, req.body._id + '-' +file.originalname )
    }
})
  
const upload = multer({ storage: storage }).single('file')


//post request for sending gallery img
router.post('/', upload , async(req, res) => {

        const id = req.body._id;
        const data = await mail.find({ design : { $exists:true } });
       

        try {
            const design = await User.findByIdAndUpdate(req.body._id, {
                $push : { 
                    designUploads : {
                        file : {
                             "filename" : req.file.filename 
                            }
                        } 
                    } 
                }).exec()

            const subs = mail.findByIdAndUpdate(data[0]._id, { $push: {
                    design:{
                        filename:req.file.filename
                    }
                }
                }).exec()    
            
    
            return res.status(200).send("success!!!");
        }catch (err) {
             return res.status(400).send(err);
        }
          return res.status(200).send(req.file)
});

//get request for gallery img
//  router.get('/', async(req, res) => {
//      const user= await User.findById({_id : req.body._id});
//      console.log(user);
//   const imData = await design.find({ })
//   const img = [];
//   for(let i=0;i<imData.length;i++) {
//     img.push( {_id:imData[i]._id,route:"gallery",filename:imData[i].file.filename} )
//   }

//   res.send(img)
// res.send("test")
// });

// delete request for gallery api using mongo object id
// router.put('/delete/:id',async(req,res)=>{
//   const data = await gallery.findByIdAndRemove({_id:req.params.id}, console.log("deleted") )
//   res.send(data);

// })

module.exports = router;