const client = require('../config/coinbase'); // Import the `makeRequest` function

// Function to get all available currencies
const getCurrencies = async () => {
  try {
    const response = await client.makeRequest('GET', '/currencies'); // Use makeRequest directly
    return response.data || response; // Adjust based on response structure
  } catch (error) {
    throw new Error(`Error fetching currencies: ${error.message}`);
  }
};

// Function to get all available products (trading pairs)
const getProducts = async () => {
  try {
    const response = await client.makeRequest('GET', '/products'); // Use makeRequest directly
    return response.data || response; // Adjust based on response structure
  } catch (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
};

// Function to create a transaction (send money or crypto)
const createTransaction = async (accountId, amount, currency) => {
  try {
    const body = {
      amount,
      currency,
    };
    const response = await client.makeRequest('POST', `/accounts/${accountId}/transactions`, body); // Use makeRequest directly
    return response.data || response;
  } catch (error) {
    throw new Error(`Error creating transaction: ${error.message}`);
  }
};

module.exports = {
  getCurrencies,
  getProducts,
  createTransaction,
};
