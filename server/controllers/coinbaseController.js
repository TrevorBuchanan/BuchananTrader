const { getCoinbasePrice } = require('../services/coinbaseService');

const coinbaseController = async (req, res) => {
  try {
    const price = await getCoinbasePrice();
    res.json(price);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Coinbase price' });
  }
};

module.exports = coinbaseController;
