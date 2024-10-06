const axios = require('axios');

const getCoinbasePrice = async () => {
  const response = await axios.get('https://api.coinbase.com/v2/prices/BTC-USD/spot');
  return response.data.data.amount;
};

module.exports = { getCoinbasePrice };
