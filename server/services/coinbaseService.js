// coinbaseService.js

const client = require('../config/coinbase');

// Function to get all available assets (trading pairs)
const getAssetsList = async () => {
  try {
    const response = await client.makeRequest('GET', '/products');
    return response.data || response;
  } catch (error) {
    throw new Error(`Error (service) fetching products: ${error.message}`);
  }
};

// Function to get current asset price and other info
const getAssetInfo = async (assetID) => {
  try {
    const response = await client.makeRequest('GET', `/products/${assetID}`);
    return response.data || response;
  } catch (error) {
    throw new Error(`Error (service) fetching product ${assetID}: ${error.message}`);
  }
};

// Function to get asset history
const getHistory = async (assetID, start, end, granularity) => {
  try {
    const response = await client.makeRequest('GET', `/products/${assetID}/candles?start=${start}&end=${end}&granularity=${granularity}`);
    return response.data || response;
  } catch (error) {
    throw new Error(`Error (service) getting asset history: ${error.message}`);
  }
};

module.exports = {
  getAssetsList,
  getAssetInfo,
  getHistory
};
