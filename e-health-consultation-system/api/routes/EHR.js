const express = require('express');
const router = express.Router();
const ehrController = require('../controllers/EHR');

// GET all EHR records
router.get('/', ehrController.getEHR);

// GET a single EHR record by patient id
router.get('/:id', ehrController.getEHRByPatientId);

// POST a new EHR record
router.post('/', ehrController.createEHR);

// PUT update an EHR record by id
router.put('/:id', ehrController.updateEHR);

// DELETE an EHR record by id
router.delete('/:id', ehrController.deleteEHR);

module.exports = router;
