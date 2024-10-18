const express = require('express');
const router = express.Router();
const coinbaseController = require('../controllers/coinbaseController');
const tradingEngineController = require('../controllers/tradingEngineController');

// Coinbase API routes
router.get('/coinbase/currencies', coinbaseController.getCurrencies);
router.get('/coinbase/products', coinbaseController.getProducts);
router.get('/coinbase/products/:product_id', coinbaseController.getProduct)
router.post('/coinbase/transactions', coinbaseController.createTransaction);

// Mock buying API routes 
router.post('/trading-engine/addPrice', tradingEngineController.addPrice); 
router.get('/trading-engine/getAction', tradingEngineController.getAction);

module.exports = router;
