const express = require('express');
const { getCoinbaseData } = require('../config/coinbase');

const router = express.Router();

// Example route to get data from Coinbase
router.get('/coinbase', async (req, res) => {
  try {
    const data = await getCoinbaseData();
    res.json(data);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
