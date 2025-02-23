const axios = require('axios');
const ECJWTgenerator = require('../utils/ECJWTgenerator');
const { User } = require('../models/User');

const USER_AGENT = "buchanantrader";
const BASE_URL = 'api.coinbase.com';
const API_PREFIX = "/api/v3/brokerage";

/**
 * Generates headers required for Coinbase API requests using user-specific keys.
 * @param {string} uri - URI path for the request
 * @param {string} apiKey - User's API key
 * @param {string} privateKey - User's private key
 * @returns {object} Headers object
 */
const makeHeaders = (uri, apiKey, privateKey) => {
  const token = ECJWTgenerator.makeECJWT(apiKey, privateKey, uri);
  return {
    'User-agent': USER_AGENT,
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

/**
 * Retrieves the API key and private key for a user from the database.
 * @param {number} userId - ID of the current user
 * @returns {object} An object containing the user's API key and private key
 */
const getUserKeys = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user || !user.apiKey || !user.privateKey) {
    throw new Error('API key or private key not set for this user.');
  }
  return {
    apiKey: user.apiKey,
    privateKey: user.privateKey,
  };
};

/**
 * Makes a request to the Coinbase API with specified parameters.
 * @param {number} userId - ID of the current user
 * @param {string} method - HTTP method (e.g., GET, POST)
 * @param {string} requestPath - Endpoint path for the request
 * @param {object} params - URL parameters for the request
 * @param {object} data - Payload for the request
 * @param {number} timeout - Request timeout in milliseconds
 * @returns {object} Response data from the API
 */
const makeRequest = async (userId, method, requestPath, params = {}, data = {}, timeout = 10000) => {
  try {
    // Retrieve the user's API keys
    const { apiKey, privateKey } = await getUserKeys(userId);

    // Construct the URL and headers
    const url = `https://${BASE_URL}${API_PREFIX}${requestPath}`;
    const headers = makeHeaders(`${method} ${BASE_URL}${API_PREFIX}${requestPath}`, apiKey, privateKey);

    // Make the API request
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
};

module.exports = {
  makeRequest,
};
