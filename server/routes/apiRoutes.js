const express = require('express');
const router = express.Router();
const coinbaseController = require('../controllers/coinbaseController');

// Coinbase API routes
router.get('/coinbase/currencies', coinbaseController.getCurrencies);
router.get('/coinbase/products', coinbaseController.getProducts);
router.get('/coinbase/products/:product_id', coinbaseController.getProduct)
router.post('/coinbase/transactions', coinbaseController.createTransaction);

module.exports = router;
