const TradingEngineManager = require('../utils/TradingEngineManager');

const tradingEngineManager = new TradingEngineManager();

const getAssetAction = async (assetName) => {
    try {
        const action = tradingEngineManager.getAssetAction(assetName);
        return action; 
    } catch (error) {
        throw new Error(`Error getting asset action: ${error.message}`); 
    }
}

const addAssetPrice = async (assetName, price, time) => {
    try {
        tradingEngineManager.addAssetPrice(assetName, price, time);
    } catch (error) {
        throw new Error(`Error adding asset price: ${error.message}`); 
    }
}

const getAssetProfitLoss = async (assetName) => {
    try {
        const profitLoss = tradingEngineManager.getAssetProfitLoss(assetName);
        return profitLoss;
    } catch (error) {
        throw new Error(`Error adding asset profit loss: ${error.message}`); 
    }
}

const removeAsset = async (assetName) => {
    try {
        const resultMsg = await tradingEngineManager.removeAssetTradingEngine(assetName);
        return resultMsg;
    } catch (error) {
        throw new Error(`Error removing asset: ${error.message}`); 
    }
}

// Exporting the functions with correct names
module.exports = {
    getAssetAction,
    addAssetPrice,
    getAssetProfitLoss,
    removeAsset,
};
