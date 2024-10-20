const axios = require('axios');
const JWTgenerator = require('../utils/JWTgenerator');
require('dotenv').config();

const USER_AGENT = "buchanantrader";
const BASE_URL = 'api.coinbase.com';
const API_PREFIX = "/api/v3/brokerage";

const apiKey = process.env.COINBASE_API_KEY;
const privateKey = process.env.COINBASE_PRIVATE_KEY;

const makeHeaders = (uri) => {
  const token = JWTgenerator.makeJWT(apiKey, privateKey, uri);
  const headers = {
    'User-agent': USER_AGENT,
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  return headers;
};


const makeRequest = async (method, requestPath, params = {}, data = {}, timeout = 10000) => {
  url = `https://${BASE_URL}${API_PREFIX}${requestPath}`;

  // console.log(method + ' ' + url);

  const headers = makeHeaders(`${method} ${BASE_URL}${API_PREFIX}${requestPath}`);

  try {
    const response = await axios({
      method: method,
      url: url,
      params: params,
      data: data,
      headers: headers,
      timeout: timeout,
    });
    // console.log(response.data);
    return response.data; // Return the response data from the API
  } catch (error) {
    console.error('Error making request:', error.response ? error.response.data : error.message);
    throw error; // Rethrow the error for handling elsewhere
  }
}

module.exports = {
  makeRequest,
};
