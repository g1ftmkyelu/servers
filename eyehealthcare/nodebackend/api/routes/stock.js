const express = require('express');
const router = express.Router();
const productController = require('../controllers/stock');


const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', upload.single('file'), productController.createProduct);
router.put('/:id', upload.single('file'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
