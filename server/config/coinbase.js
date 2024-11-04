const axios = require('axios');
const ECJWTgenerator = require('../utils/ECJWTgenerator');
require('dotenv').config();

const USER_AGENT = "buchanantrader";
const BASE_URL = 'api.coinbase.com';
const API_PREFIX = "/api/v3/brokerage";

const apiKey = process.env.COINBASE_API_KEY;
const privateKey = process.env.COINBASE_PRIVATE_KEY;

/**
 * Generates headers required for Coinbase API requests
 * @param {string} uri - URI path for the request
 * @returns {object} Headers object
 */
const makeHeaders = (uri) => {
  const token = ECJWTgenerator.makeECJWT(apiKey, privateKey, uri);
  return {
    'User-agent': USER_AGENT,
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

/**
 * Makes a request to the Coinbase API with specified parameters.
 * @param {string} method - HTTP method (e.g., GET, POST)
 * @param {string} requestPath - Endpoint path for the request
 * @param {object} params - URL parameters for the request
 * @param {object} data - Payload for the request
 * @param {number} timeout - Request timeout in milliseconds
 * @returns {object} Response data from the API
 */
const makeRequest = async (method, requestPath, params = {}, data = {}, timeout = 10000) => {
  const url = `https://${BASE_URL}${API_PREFIX}${requestPath}`;
  const headers = makeHeaders(`${method} ${BASE_URL}${API_PREFIX}${requestPath}`);

  try {
    const response = await axios({
      method,
      url,
      params,
      data,
      headers,
      timeout,
    });
    return response.data; // Return the response data from the API
  } catch (error) {
    throw error; // Rethrow the error for handling elsewhere
  }
}

module.exports = {
  makeRequest,
};
