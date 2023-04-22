const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patients');

// GET all patients
router.get('/patients', patientController.getAllPatients);

// GET a single patient by id
router.get('/patients/:id', patientController.getPatientById);

// POST a new patient
router.post('/patients', patientController.createPatient);

// PUT update a patient by id
router.put('/patients/:id', patientController.updatePatientById);

// DELETE a patient by id
router.delete('/patients/:id', patientController.deletePatientById);

module.exports = router;
