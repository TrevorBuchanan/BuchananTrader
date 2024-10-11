const express = require('express');
const router = express.Router();
const coinbaseController = require('../controllers/coinbaseController');

// Define your API routes
router.get('/coinbase/accounts', coinbaseController.getAccounts);
router.get('/coinbase/currencies', coinbaseController.getCurrencies);
router.get('/coinbase/products', coinbaseController.getProducts);
router.post('/coinbase/transactions', coinbaseController.createTransaction); // POST for creating transactions

// Export the router
module.exports = router;
