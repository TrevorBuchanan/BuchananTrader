// databaseController.js

const databaseService = require('../services/databaseService');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await databaseService.createUser(userData);
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await databaseService.authenticateUser(email, password);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const secretKey = process.env.JWT_SECRET;

        // Generate a token with error handling
        let token;
        try {
            token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
        } catch (signError) {
            console.error('Error generating token:', signError);
            return res.status(500).json({ error: 'Error generating token' });
        }

        // Successful response
        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// Log asset price
const logAssetPrice = async (req, res) => {
    const { asset_name, price, time } = req.body;

    try {
        const loggedPrice = await databaseService.logAssetPrice(asset_name, price, time);
        res.status(201).json(loggedPrice);
    } catch (err) {
        console.error('Error logging asset price:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get asset price series
const getAssetPriceSeries = async (req, res) => {
    const { asset_name } = req.query;

    try {
        const priceSeries = await databaseService.getLoggedAssetPriceSeries(asset_name);
        res.status(200).json(priceSeries);
    } catch (err) {
        console.error('Error retrieving asset price series:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logAssetPrice,
    getAssetPriceSeries,
};