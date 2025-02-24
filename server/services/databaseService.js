// databaseService.js

const AssetPrice = require('../models/AssetPrice');
const {Op} = require("sequelize");

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

module.exports = {
    logAssetPrice,
    getLoggedAssetPriceSeries,
};