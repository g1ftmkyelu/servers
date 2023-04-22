const express = require('express');
const router = express.Router();
const multer = require('multer');
const patientController = require('../controllers/patients');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);
router.post('/', patientController.createPatient);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);

module.exports = router;
