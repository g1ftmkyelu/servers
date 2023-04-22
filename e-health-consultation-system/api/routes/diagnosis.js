const express = require('express');
const router = express.Router();
const diagnosisController = require('../controllers/diagnosis');

// GET all diagnoses

// GET a single diagnosis by id
router.get('/diagnoses/:id', diagnosisController.getDiagnosesByPatientId);

// POST a new diagnosis
router.post('/diagnoses', diagnosisController.createDiagnosis);

// PUT update a diagnosis by id
router.put('/diagnoses/:id', diagnosisController.updateDiagnosisById);

// DELETE a diagnosis by id
router.delete('/diagnoses/:id', diagnosisController.deleteDiagnosis);

module.exports = router;
