const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointments');

// GET all appointments
router.get('/', appointmentsController.getAppointments);

// GET an appointment by ID
router.get('/:id', appointmentsController.getAppointmentById);

// POST a new appointment
router.post('/', appointmentsController.createAppointment);

// PUT update an appointment by ID
router.put('/:id', appointmentsController.updateAppointment);

// DELETE an appointment by ID
router.delete('/:id', appointmentsController.deleteAppointment);

module.exports = router;

