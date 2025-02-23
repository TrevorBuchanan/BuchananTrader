const express = require('express');
const router = express.Router();
const coinbaseController = require('../controllers/coinbaseController');
const tradingEngineController = require('../controllers/tradingEngineController');
const databaseController = require('../controllers/databaseController');

// Coinbase API routes
router.get('/coinbase/assets-list', coinbaseController.getAssetsList);
router.get('/coinbase/asset-info', coinbaseController.getAssetInfo);
router.get('/coinbase/asset-history', coinbaseController.getHistory);

// Engine API routes
router.post('/trading-engine/add-price', tradingEngineController.addAssetPrice);
router.get('/trading-engine/action', tradingEngineController.getAssetAction);
router.get('/trading-engine/profit-loss', tradingEngineController.getAssetProfitLoss);
router.get('/trading-engine/long-loss-limit', tradingEngineController.getAssetLongLossLimit);
router.get('/trading-engine/short-loss-limit', tradingEngineController.getAssetShortLossLimit)
router.get('/trading-engine/ema', tradingEngineController.getAssetEMA)
router.post('/trading-engine/close-positions', tradingEngineController.closeAssetAllPositions)
router.delete('/trading-engine/remove-asset/:assetName', tradingEngineController.removeAsset);

// Database routes
router.post('/register', databaseController.registerUser);
router.post('/login', databaseController.loginUser);
router.post('/log-price', databaseController.logAssetPrice);
router.get('/fetch-prices', databaseController.getAssetLoggedPriceSeries);
router.post('/set-user-keys', databaseController.setUserKeys);

module.exports = router;
