const gm = require('gm');

const router = require('express').Router();
const multer = require('multer');

//multer disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/')
    },
    filename: function (req, file, cb) {
        console.log(file)
      cb(null, Date.now() + '-' +file.originalname  )
    }
})
  
const upload = multer({ storage: storage }).single('file')

router.post('/', (req, res) => {
     console.log(req.files)
    upload(req, res, err => {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
           console.log(req.files)
      return res.status(200).send(req.files)

    })

});
router.get('/', (req, res) => {
    res.send("image-prop route works!!")
})

module.exports = router;