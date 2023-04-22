const express = require('express');
const router = express.Router();
const ehrController = require('../controllers/EHR');

// GET all EHR records
router.get('/ehr', ehrController.getEHR);

// GET a single EHR record by id
router.get('/ehr/:id', ehrController);

// POST a new EHR record
router.post('/ehr', ehrController.createEhrRecord);

// PUT update an EHR record by id
router.put('/ehr/:id', ehrController.updateEhrRecordById);

// DELETE an EHR record by id
router.delete('/ehr/:id', ehrController.deleteEhrRecordById);

module.exports = router;
