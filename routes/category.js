const router = require('express').Router();
const mongoose = require('mongoose')

const Category = require('../model/category');

router.post('/', async(req, res) => {
    const category = new Category({
        name : req.body.name,
    })
    console.log(category)
    try {
        const savedCategory = await category.save();
        res.send(savedCategory);
    }
    catch (err) {
        res.status(400).send(err);
    }
})

router.get('/', async(req, res) => {
    const categories = await Category.find({ });
    res.send(categories);
})


module.exports = router;
