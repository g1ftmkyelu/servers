const express = require('express');
const router = express.Router();
const diagnosisController = require('../controllers/diagnosis');

// GET all diagnoses
router.get('/', diagnosisController.getAllDiagnoses);

// GET a single diagnosis by id
router.get('/:id', diagnosisController.getDiagnosisById);

// GET a single diagnosis by id
router.get('/patient/:id', diagnosisController.getDiagnosesByPatientId);

// POST a new diagnosis
router.post('/', diagnosisController.createDiagnosis);

// PUT update a diagnosis by id
router.put('/:id', diagnosisController.updateDiagnosisById);

// DELETE a diagnosis by id
router.delete('/:id', diagnosisController.deleteDiagnosis);

module.exports = router;
