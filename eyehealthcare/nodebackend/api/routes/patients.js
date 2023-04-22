const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patients');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);
router.post('/', upload.single('file'),  patientController.createPatient);
router.put('/:id', upload.single('file'), patientController.updatePatient);
router.put('/update-history/:id', patientController.updatePatientHistory);
router.delete('/:id', patientController.deletePatient);

module.exports = router;
