// databaseService.js

const User = require('../models/User');
const AssetPrice = require('../models/AssetPrice');
const {Op} = require("sequelize");

const createUser = async (userData) => {
    try {
        return await User.create(userData);
    } catch (err) {
        throw err;
    }
};

// Find user by email
const findUserByEmail = async (email) => {
    try {
        return await User.findOne({ where: { email } });
    } catch (err) {
        console.log(err)
        throw err;
    }
};

// Authenticate user credentials
const authenticateUser = async (email, password) => {
    try {
        const user = await findUserByEmail(email);
        // console.log(user);
        if (!user) return null;

        // Check if password matches
        const isMatch = await user.comparePassword(password);
        return isMatch ? user : null;
    } catch (err) {
        console.log(err)
        throw err;
    }
};

// Log asset price
const logAssetPrice = async (asset_name, price, time) => {
    try {
        return await AssetPrice.create({ asset_name, price, time });
    } catch (err) {
        console.error('Error logging asset price:', err);
        throw err;
    }
};

// Retrieve logged asset price series
const getLoggedAssetPriceSeries = async (asset_name) => {
    try {
        return await AssetPrice.findAll({
            where: {
                asset_name,
            },
            order: [['time', 'ASC']], // Sort by time in ascending order
        });
    } catch (err) {
        console.error('Error retrieving asset price series:', err);
        throw err;
    }
};

module.exports = {
    createUser,
    findUserByEmail,
    authenticateUser,
    logAssetPrice,
    getLoggedAssetPriceSeries,
};