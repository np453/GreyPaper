const express = require('express');
const router = express.Router();

const Stripe = require('stripe')(process.env.SECRET_KEY);

const uuid = require('uuid');
const uuidv4 = uuid.v4;

router.post('/', async(req, res) => {

    const { token, product } = req.body;
    
    const idempotencyKey = uuidv4();

    const customer = await Stripe.customers.create({
        email:token.email,
        source:token.id
    })
        
    const charges = await Stripe.charges.create({
            amount:product.price * 100,
            currency:"INR",
            customer:customer.id,
            description:`${product.name} purchased`,
        }, {idempotencyKey})

        console.log(charges)
        res.send(charges)

})

module.exports = router;