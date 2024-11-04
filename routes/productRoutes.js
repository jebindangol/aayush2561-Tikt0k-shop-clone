const express = require('express');
const { addProduct, getProducts } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/products', authMiddleware, addProduct);
router.get('/products', getProducts);

module.exports = router;
