const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patients');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// GET all patients
router.get('/', patientController.getAllPatients);

// GET a single patient by id
router.get('/:id', patientController.getPatientById);

// POST a new patient
router.post('/', upload.single('file'), patientController.createPatient);

// PUT update a patient by id
router.put('/:id', upload.single('file'), patientController.updatePatient);

// DELETE a patient by id
router.delete('/:id', patientController.deletePatient);


module.exports = router;
