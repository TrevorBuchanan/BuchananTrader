const axios = require('axios');
const crypto = require('crypto');
const dotenv = require('dotenv');

// Initialize dotenv for loading environment variables
dotenv.config();

// Load your API credentials from the environment variables
const apiKey = process.env.COINBASE_API_KEY;
const privateKey = process.env.COINBASE_PRIVATE_KEY;

// Function to create the Coinbase signature
const signMessage = (timestamp, method, requestPath, body = '') => {
  const message = `${timestamp}${method}${requestPath}${body}`;
  return crypto.createHmac('sha256', privateKey).update(message).digest('hex');
};

// Function to get data from Coinbase
const getCoinbaseData = async () => {
  const temp_path = '/prices/spot?currency=USD'; // TODO: CHANGE TO PASS IN AS PARAM

  const timestamp = Math.floor(Date.now() / 1000); 
  const method = 'GET';  
  const requestPath = '/v2' + temp_path; 
  
  // No body for GET requests, but need this if using POST/PUT methods
  const body = '';  // Empty for GET
  
  // Sign the message
  const signature = signMessage(timestamp, method, requestPath, body);

  try {
    console.log(`API LINK TO DATA: https://api.coinbase.com${requestPath}`)
    const response = await axios.get(`https://api.coinbase.com${requestPath}`, {
      headers: {
        'CB-ACCESS-KEY': apiKey,
        'CB-ACCESS-SIGN': signature,
        'CB-ACCESS-TIMESTAMP': timestamp,
        'CB-VERSION': '2024-09-23', 
      },
    });

    console.log('Coinbase API Response:', response.data);  // Log the API response here

    return response.data;
  } catch (error) {
    console.error('Error fetching data from Coinbase:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = { getCoinbaseData };
