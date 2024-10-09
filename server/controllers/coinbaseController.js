const { fetchCoinbaseInfo } = require('../services/coinbaseService');

// Controller to handle Coinbase API requests
const getCoinbaseData = async (req, res) => {
  try {
    const { endpoint } = req.params; // Extract the endpoint from the request params
    const coinbaseData = await fetchCoinbaseInfo(endpoint);
    res.status(200).json(coinbaseData);
  } catch (error) {
    console.error('Error in getCoinbaseData:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getCoinbaseData };