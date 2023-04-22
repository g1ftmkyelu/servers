const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

router.post('/patient', loginController.patientLogin)
router.post('/staff', loginController.staffLogin)

module.exports = router;
