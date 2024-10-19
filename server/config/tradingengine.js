const TradingEngineManager = require('../utils/TradingEngineManager');

const tradingEngineManager = new TradingEngineManager();

const getAssetAction = async (assetName) => {
    try {
        const action = tradingEngineManager.getAssetAction(assetName);
        return action; 
    } catch (error) {
        throw error; 
    }
}

const addAssetPrice = async (assetName, price) => {
    try {
        const result = tradingEngineManager.addAssetPrice(assetName, price);
        return result;
    } catch (error) {
        throw error;
    }
}

const getAssetProfitLoss = async (assetName) => {
    try {
        const profitLoss = tradingEngineManager.getAssetProfitLoss(assetName);
        return profitLoss;
    } catch (error) {
        throw error;
    }
}

// Exporting the functions with correct names
module.exports = {
    getAssetAction,
    addAssetPrice,
    getAssetProfitLoss,
};
