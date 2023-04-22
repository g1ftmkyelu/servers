const express = require('express');
const router = express.Router();
const multer = require('multer');
const staffController = require('../controllers/staff');


const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.get('/',  staffController.getStaffs);
router.get('/:id', staffController.getStaffById);
router.post('/', staffController.createStaff);
router.put('/:id', staffController.updateStaffById);
router.delete('/:id', staffController.deleteStaffById);

module.exports = router;
