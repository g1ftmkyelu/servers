const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptions');

// GET all prescriptions
router.get('/', prescriptionController.getPrescriptions);

// GET a single prescription by id
router.get('/:id', prescriptionController.getPrescription);


router.get('/diagnosis/:id', prescriptionController.getPrescriptionByDiagnoisId);

// POST a new prescription
router.post('/', prescriptionController.createPrescription);

// PUT update a prescription by id
router.put('/:id', prescriptionController.updatePrescription);

// DELETE a prescription by id
router.delete('/:id', prescriptionController.deletePrescription);

module.exports = router;
