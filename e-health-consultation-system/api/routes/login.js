const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

router.post('/patient', loginController.patientLogin)
router.post('/doctor', loginController.doctorLogin)

module.exports = router;
