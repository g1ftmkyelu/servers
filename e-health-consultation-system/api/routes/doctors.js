const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctors');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// GET all doctors
router.get('/', doctorController.getAllDoctors);

// GET a single doctor by id
router.get('/:id', doctorController.getDoctorById);

// POST a new doctor
router.post('/',upload.single('file'), doctorController.createDoctor);

// PUT update a doctor by id
router.put('/:id', upload.single('file'), doctorController.updateDoctor);


router.put('/add-education/:id', doctorController.AddDoctorEducation);


router.put('/remove-education/:id', doctorController.RemoveDoctorEducation);

// DELETE a doctor by id
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;
