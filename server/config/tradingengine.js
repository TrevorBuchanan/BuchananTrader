const TradingEngineManager = require('../utils/TradingEngineManager');

const tradingEngineManager = new TradingEngineManager();

const getAssetAction = async (assetName) => {
    try {
        return tradingEngineManager.getAssetAction(assetName);
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
        return tradingEngineManager.getAssetProfitLoss(assetName);
    } catch (error) {
        throw new Error(`Error getting asset profit loss: ${error.message}`);
    }
}

const getAssetLongLossLimit = async (assetName) => {
    try {
        return tradingEngineManager.getAssetLongLossLimit(assetName);
    } catch (error) {
        throw new Error(`Error getting asset long loss limit: ${error.message}`);
    }
}

const getAssetShortLossLimit = async (assetName) => {
    try {
        return tradingEngineManager.getAssetShortLossLimit(assetName);
    } catch (error) {
        throw new Error(`Error getting asset short loss limit: ${error.message}`);
    }
}

const getAssetEMA = async (assetName) => {
    try {
        return tradingEngineManager.getAssetEMA(assetName);
    } catch (error) {
        throw new Error(`Error getting asset EMA: ${error.message}`);
    }
}

const closeAssetAllPositions = async (assetName) => {
    try {
        tradingEngineManager.closeAssetAllPositions(assetName);
    } catch (error) {
        throw new Error(`Error closing positions for asset: ${error.message}`);
    }
}

const removeAsset = async (assetName) => {
    try {
        return tradingEngineManager.removeAssetTradingEngine(assetName);
    } catch (error) {
        throw new Error(`Error removing asset engine: ${error.message}`);
    }
}

// Exporting the functions with correct names
module.exports = {
    getAssetAction,
    addAssetPrice,
    getAssetProfitLoss,
    getAssetLongLossLimit,
    getAssetShortLossLimit,
    getAssetEMA,
    closeAssetAllPositions,
    removeAsset,
};
