const coinbaseService = require('../services/coinbaseService');

const getCurrencies = async (req, res) => {
  try {
    const currencies = await coinbaseService.getCurrencies();
    res.json(currencies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching currencies', error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await coinbaseService.getProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

const createTransaction = async (req, res) => {
  const { accountId, amount, currency } = req.body;
  try {
    const transaction = await coinbaseService.createTransaction(accountId, amount, currency);
    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating transaction', error: error.message });
  }
};

module.exports = {
  getCurrencies,
  getProducts,
  createTransaction,
};
