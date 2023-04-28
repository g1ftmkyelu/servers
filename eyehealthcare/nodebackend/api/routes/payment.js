const express = require('express');
const router = express.Router();
const controller= require('../controllers/payments')

router.post('/pay/stripe', controller.stripe);

module.exports=router