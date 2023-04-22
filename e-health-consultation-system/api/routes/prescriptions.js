const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptions');

// GET all prescriptions
router.get('/prescriptions', prescriptionController.getAllPrescriptions);

// GET a single prescription by id
router.get('/prescriptions/:id', prescriptionController.getPrescriptionById);

// POST a new prescription
router.post('/prescriptions', prescriptionController.createPrescription);

// PUT update a prescription by id
router.put('/prescriptions/:id', prescriptionController.updatePrescriptionById);

// DELETE a prescription by id
router.delete('/prescriptions/:id', prescriptionController.deletePrescriptionById);

module.exports = router;
