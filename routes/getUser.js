const router = require('express').Router();
const mongoose = require('mongoose')

const User = require('../model/user');

router.get('/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
})


module.exports = router;
