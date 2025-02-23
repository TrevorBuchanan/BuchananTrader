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
const logAssetPrice = async (assetName, price, time) => {
    try {
        const asset_name = assetName;

        // Attempt to parse `time` manually for "HH:MM:SS AM/PM" format
        let formattedTime;
        if (typeof time === 'string' && time.match(/^\d{1,2}:\d{2}(:\d{2})?\s?(AM|PM)$/i)) {
            const now = new Date(); // Use current date for context
            const [hours, minutes, seconds] = time
                .split(/[: ]/) // Split by ":" and space
                .map((v) => parseInt(v, 10));

            const isPM = time.toLowerCase().includes('pm');
            const adjustedHours = isPM && hours !== 12 ? hours + 12 : hours === 12 && !isPM ? 0 : hours;

            // Create a full Date object
            formattedTime = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                adjustedHours,
                minutes,
                seconds || 0
            ).toISOString();
        } else {
            throw new Error(`Invalid time format: ${time}`);
        }

        return await AssetPrice.create({ asset_name, price, time: formattedTime });
    } catch (err) {
        console.error('Error logging asset price:', err.message);
        throw err;
    }
};

// Retrieve logged asset price series
const getLoggedAssetPriceSeries = async (assetID) => {
    try {
        return await AssetPrice.findAll({
            where: {
                asset_name: assetID,
            },
            order: [['time', 'ASC']], // Sort by time in ascending order
        });
    } catch (err) {
        console.error('Error retrieving asset price series:', err);
        throw err;
    }
};

const setUserKeys = async (userId, newApiKey, newPrivateKey) => {
    try {
        // Find the user by ID
        const user = await User.findByPk(userId);
        
        if (!user) {
            throw new Error('User not found');
        }

        // Update the user's keys
        user.apiKey = newApiKey;
        user.privateKey = newPrivateKey;

        // Save the updated user
        await user.save();

        return {
            success: true,
            message: 'User keys updated successfully',
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to update user keys',
        };
    }
};


module.exports = {
    createUser,
    findUserByEmail,
    authenticateUser,
    logAssetPrice,
    getLoggedAssetPriceSeries,
    setUserKeys,
};