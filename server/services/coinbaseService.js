const client = require('../config/coinbase');

console.log(client);

// Function to get accounts
const getAccounts = async () => {
  return new Promise((resolve, reject) => {
    client.getAccounts({}, (err, accounts) => {
      if (err) {
        return reject(err);
      }
      resolve(accounts);
    });
  });
};

// Function to get all currencies
const getCurrencies = async () => {
  return new Promise((resolve, reject) => {
    client.getCurrencies({}, (err, currencies) => {
      if (err) {
        return reject(err);
      }
      resolve(currencies);
    });
  });
};

// Function to get products (trading pairs)
const getProducts = async () => {
  return new Promise((resolve, reject) => {
    client.getProducts({}, (err, products) => {
      if (err) {
        return reject(err);
      }
      resolve(products);
    });
  });
};

// Function to create a transaction
const createTransaction = async (accountId, amount, currency) => {
  return new Promise((resolve, reject) => {
    client.getAccount(accountId, (err, account) => {
      if (err) {
        return reject(err);
      }
      account.sendMoney({ amount, currency }, (err, transaction) => {
        if (err) {
          return reject(err);
        }
        resolve(transaction);
      });
    });
  });
};

// Export the service functions
module.exports = {
  getAccounts,
  getCurrencies,
  getProducts,
  createTransaction,
};
