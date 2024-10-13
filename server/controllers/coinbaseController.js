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

const getProduct = async (req, res) => {
  const { product_id } = req.params; // Extract the product_id from the route parameter
  try {
    const product = await coinbaseService.getProduct(product_id); // Pass product_id to the service
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error fetching product ${product_id}`, error: error.message });
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
  getProduct,
  createTransaction,
};
