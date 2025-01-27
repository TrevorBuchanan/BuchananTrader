const express = require('express');
const router = express.Router();
const coinbaseController = require('../controllers/coinbaseController');
const tradingEngineController = require('../controllers/tradingEngineController');
const databaseController = require('../controllers/databaseController');

// Coinbase API routes
router.get('/coinbase/currencies', coinbaseController.getCurrencies);
router.get('/coinbase/products', coinbaseController.getProducts);
router.get('/coinbase/products/:product_id', coinbaseController.getProduct);
router.post('/coinbase/transactions', coinbaseController.createTransaction);

// Engine API routes
router.post('/trading-engine/add-price', tradingEngineController.addAssetPrice);
router.get('/trading-engine/action', tradingEngineController.getAssetAction);
router.get('/trading-engine/profit-loss', tradingEngineController.getAssetProfitLoss);
router.get('/trading-engine/long-loss-limit', tradingEngineController.getAssetLongLossLimit);
router.get('/trading-engine/short-loss-limit', tradingEngineController.getAssetShortLossLimit)
router.delete('/trading-engine/remove-asset/:assetName', tradingEngineController.removeAsset);

// Database routes
router.post('/register', databaseController.registerUser);
router.post('/login', databaseController.loginUser);
router.post('/log-price', databaseController.logAssetPrice);
router.get('/fetch-prices', databaseController.getAssetPriceSeries);

module.exports = router;
