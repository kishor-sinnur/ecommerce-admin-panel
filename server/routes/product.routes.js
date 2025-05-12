const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.controller');
const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.js');  // Import your multer middleware

// Routes
router.post('/', auth, upload.single('image'), productCtrl.createProduct);  // Upload image for product creation
router.get('/', auth, productCtrl.getAllProducts);
router.get('/:id', auth, productCtrl.getProductById);
router.put('/:id', auth, upload.single('image'), productCtrl.updateProduct);  // Upload image for product update
router.delete('/:id', auth, productCtrl.deleteProduct);

module.exports = router;
