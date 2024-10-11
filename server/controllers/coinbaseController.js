const coinbaseService = require('../services/coinbaseService');

// Controller to get accounts
const getAccounts = async (req, res) => {
  try {
    const accounts = await coinbaseService.getAccounts();
    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching accounts', error: error.message });
  }
};

// Controller to get currencies
const getCurrencies = async (req, res) => {
  try {
    const currencies = await coinbaseService.getCurrencies();
    res.json(currencies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching currencies', error: error.message });
  }
};

// Controller to get products
const getProducts = async (req, res) => {
  try {
    const products = await coinbaseService.getProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Controller to create a transaction
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

// Export the controller functions
module.exports = {
  getAccounts,
  getCurrencies,
  getProducts,
  createTransaction,
};
