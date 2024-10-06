const axios = require('axios');
const { ec } = require('elliptic');
const crypto = require('crypto');

// Initialize the EC instance
const ecInstance = new ec('secp256k1');

// Load your private key from the environment variable
const privateKey = process.env.COINBASE_PRIVATE_KEY;

// Function to sign a message
const signMessage = (message) => {
  const msgHash = crypto.createHash('sha256').update(message).digest();
  const keyPair = ecInstance.keyFromPrivate(privateKey);
  return keyPair.sign(msgHash).toDER('hex');
};

// Function to get data from Coinbase
const getCoinbaseData = async () => {
  const message = 'SomeAPIEndpoint'; // TODO: Specify your API endpoint
  const signature = signMessage(message);

  const response = await axios.get('https://api.coinbase.com/v2/endpoint', {
    headers: {
      'CB-ACCESS-KEY': process.env.COINBASE_API_KEY,
      'CB-ACCESS-SIGN': signature,
      'CB-ACCESS-TIMESTAMP': Math.floor(Date.now() / 1000),
      'CB-VERSION': '2024-01-01', // Replace with current API version
    },
  });

  return response.data;
};

module.exports = { getCoinbaseData };
