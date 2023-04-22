const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctors');

// GET all doctors
router.get('/doctors', doctorController.getAllDoctors);

// GET a single doctor by id
router.get('/doctors/:id', doctorController.getDoctorById);

// POST a new doctor
router.post('/doctors', doctorController.createDoctor);

// PUT update a doctor by id
router.put('/doctors/:id', doctorController.updateDoctor);

// DELETE a doctor by id
router.delete('/doctors/:id', doctorController.deleteDoctor);

module.exports = router;
