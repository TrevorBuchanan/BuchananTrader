const tradingEngineClient = require('../config/tradingengine'); 

const getAssetAction = async (assetName) => {
    try {
        const action = await tradingEngineClient.getAssetAction(assetName);
        return action; 
    } catch (error) {
        throw new Error(`Error fetching action for ${assetName}: ${error.message}`);
    }
};

const addAssetPrice = async (assetName, price) => {
    try {
        const result = await tradingEngineClient.addAssetPrice(assetName, price); 
        return result; // Return result if needed
    } catch (error) {
        throw new Error(`Error adding price to ${assetName} trading engine: ${error.message}`);
    }
};

const getAssetProfitLoss = async (assetName) => {
    try {
        const profitLoss = await tradingEngineClient.getAssetProfitLoss(assetName); 
        return profitLoss;
    } catch (error) {
        throw new Error(`Error fetching profit-loss for ${assetName}: ${error.message}`);
    }
}

module.exports = {
    getAssetAction,
    addAssetPrice,
    getAssetProfitLoss,
};
