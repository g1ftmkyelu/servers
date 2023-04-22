const express = require('express');
const router = express.Router();
const controller=require('../controllers/diagnosis')
const multer = require('multer');

const upload=multer()

  

router.post('/', upload.single('image'), controller.Diagnose)


module.exports = router;






