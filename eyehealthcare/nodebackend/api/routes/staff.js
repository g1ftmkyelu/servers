const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff');


const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.get('/',  staffController.getAllStaff);
router.get('/:id', staffController.getStaffById);
router.post('/', upload.single('file'), staffController.createStaff);
router.put('/:id', upload.single('file'), staffController.updateStaff);
router.delete('/:id', staffController.deleteStaff);

module.exports = router;
