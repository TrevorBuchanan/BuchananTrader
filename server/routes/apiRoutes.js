const express = require('express');
const router = express.Router();
const { getCoinbaseData } = require('../controllers/coinbaseController');

// Fetch prices for specific cryptocurrencies (e.g., Bitcoin, Ethereum)
router.get('/coinbase/:endpoint', getCoinbaseData);

module.exports = router;