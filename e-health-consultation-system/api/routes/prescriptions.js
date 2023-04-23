const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptions');

// GET all prescriptions
router.get('/prescriptions', prescriptionController.getPrescriptions);

// GET a single prescription by id
router.get('/prescriptions/:id', prescriptionController.getPrescription);

// POST a new prescription
router.post('/prescriptions', prescriptionController.createPrescription);

// PUT update a prescription by id
router.put('/prescriptions/:id', prescriptionController.updatePrescription);

// DELETE a prescription by id
router.delete('/prescriptions/:id', prescriptionController.deletePrescription);

module.exports = router;
