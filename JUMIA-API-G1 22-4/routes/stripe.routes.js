const express = require ('express');
const router = express.Router();
const stripeCtrl = require('../controller/stripe.controller ');

router.post("/",stripeCtrl.createPayment);


module.exports = router;