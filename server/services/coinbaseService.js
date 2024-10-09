const { getCoinbaseData } = require('../config/coinbase');

const fetchCoinbaseInfo = async (endpoint) => {
  try {
    const data = await getCoinbaseData(endpoint);
    return data;
  } catch (error) {
    console.error('Error in fetchCoinbaseInfo:', error); // Log the full error here
    throw new Error('Failed to fetch Coinbase data');
  }
};

module.exports = { fetchCoinbaseInfo };
