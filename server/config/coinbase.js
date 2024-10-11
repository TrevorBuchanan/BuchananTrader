const { Client } = require('coinbase');
require('dotenv').config();

const client = new Client({
  apiKey: process.env.COINBASE_API_KEY, 
  apiSecret: process.env.COINBASE_PRIVATE_KEY,
});

module.exports = client;
