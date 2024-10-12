const axios = require('axios');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const USER_AGENT = "buchanantrader";
const BASE_URL = 'https://api.coinbase.com';
const API_PREFIX = "/api/v3/brokerage";

const apiKey = process.env.COINBASE_API_KEY;
const privateKey = process.env.COINBASE_PRIVATE_KEY;

console.log("Api key: " + apiKey);
console.log("Private key: " + privateKey);

function generateNonce() {
  return crypto.randomBytes(16).toString('hex'); // Generate a secure nonce
}

function buildJWTHeaders(kid, nonce) {
  return {
    alg: 'ES256',
    typ: 'JWT',
    kid, // Include the key ID
    nonce, // Include the nonce
  };
}


function buildJWTPayload(keyVar, nbf, exp, uri) {
  return {
    sub: keyVar,
    iss: 'cdp',
    nbf, // Not Before time
    exp, // Expiration time
    uri, // Optional URI for REST JWTs
  };
}

// Build JWT function
function buildJWT(privateKey, keyVar, secretVar, uri) {
  const privateKeyPem = privateKey.replace(/\\n/g, '\n'); // Ensure proper line breaks

  try {
    const privateKeyObj = crypto.createPrivateKey({
      key: privateKeyPem,
      format: 'pem',
      type: 'pkcs1', // Assuming PEM-encoded PKCS#1 private key
    });

    const nbf = Math.floor(Date.now() / 1000); // Current time in seconds
    const exp = nbf + 120; // Expiration time 120 seconds from now

    const jwtHeaders = buildJWTHeaders(keyVar, generateNonce());
    const jwtPayload = buildJWTPayload(keyVar, nbf, exp, uri);

    const jwtToken = jwt.sign(jwtPayload, privateKeyObj, { algorithm: 'ES256', header: jwtHeaders });
    return jwtToken;
  } catch (error) {
    console.error('Error building JWT:', error);
    throw error; // Re-throw for handling
  }
}


// Function to make API requests
async function makeRequest(method, endpoint, data = null) {
  const url = `${BASE_URL}${API_PREFIX}${endpoint}`; // Full URL
  const uri = formatJwtUri(method, endpoint);        // Format URI for JWT
  const token = buildJwt(apiKey, privateKey, uri);   // Generate the JWT token

  const headers = {
    'User-Agent': USER_AGENT,      // User-Agent as per Coinbase requirements
    'Content-Type': 'application/json', // Set content type
    'Authorization': `Bearer ${token}` // Add JWT token to the Authorization header
  };

  console.log(headers);

  try {
    const response = await axios({
      method,
      url,
      headers,
      data
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error making request:', error.response ? error.response.data : error.message);
    throw error; // Re-throw the error after logging
  }
}

function buildRESTJWT(uri, keyVar, privateKey) {
  return buildJWT(privateKey, keyVar, '', uri); // No secret needed for REST JWTs
}

function buildWSJWT(keyVar, privateKey) {
  return buildJWT(privateKey, keyVar, '', ''); // No URI or secret for WebSocket JWTs
}

function formatJWTURI(method, path) {
  return `${method} ${BASE_URL}${path}`;
}

const restClient = {
  // ... (implement your REST client logic using built-in fetch or a library)
  get_products(limit = 1) {
    const uri = formatJWTURI('GET', '/api/v3/brokerage/accounts');
    const jwtToken = buildRESTJWT(uri, apiKey, privateKey);

    // Use the JWT token in your REST client's authorization header
    return fetch(uri, {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Include the JWT in the Authorization header
      },
    })
    .then(response => response.json())
    .then(data => console.log(JSON.stringify(data, null, 2))); // Example usage
  },
};

console.log(restClient.get_products());
console.log("HERE GUYS+++++++++++++++++++++++++++")

module.exports = {
  makeRequest,
};
