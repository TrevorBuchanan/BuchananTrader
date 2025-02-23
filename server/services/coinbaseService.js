// coinbaseService.js

const client = require('../config/coinbase');

// Function to get all available assets (trading pairs)
const getAssetsList = async () => {
  try {
    const response = await client.makeRequest('GET', '/products');
    if (response && response.data) {
      return response.data;  
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    throw new Error(`Error (service) fetching available assets list: ${error.message}`);
  }
};

// Function to get current asset price and other info
const getAssetInfo = async (assetID) => {
  try {
    const response = await client.makeRequest('GET', `/products/${assetID}`);
    if (response && response.data) {
      return response.data;  
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    throw new Error(`Error (service) fetching product ${assetID}: ${error.message}`);
  }
};

// Function to get asset history
const getHistory = async (assetID, start, end, granularity) => {
  try {
    const response = await client.makeRequest('GET', `/products/${assetID}/candles?start=${start}&end=${end}&granularity=${granularity}`);
    if (response && response.data) {
      return response.data;  
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    throw new Error(`Error (service) getting asset history: ${error.message}`);
  }
};

module.exports = {
  getAssetsList,
  getAssetInfo,
  getHistory
};
