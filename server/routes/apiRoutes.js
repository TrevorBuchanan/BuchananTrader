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
router.post('/trading-engine/add-price', tradingEngineController.addAssetPrice); 
router.post('/trading-engine/action', tradingEngineController.getAssetAction);
router.get('/trading-engine/profit-loss', tradingEngineController.getAssetProfitLoss);

module.exports = router;
