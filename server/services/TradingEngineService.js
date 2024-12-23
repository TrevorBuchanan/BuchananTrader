const tradingEngineClient = require('../config/tradingengine');

const getAssetAction = async (assetName) => {
    try {
        return await tradingEngineClient.getAssetAction(assetName);
    } catch (error) {
        throw new Error(`Error fetching action for ${assetName}: ${error.message}`);
    }
};

const addAssetPrice = async (assetName, price, time) => {
    try {
        await tradingEngineClient.addAssetPrice(assetName, price, time);
    } catch (error) {
        throw new Error(`Error adding price to ${assetName} trading engine: ${error.message}`);
    }
};

const getAssetProfitLoss = async (assetName) => {
    try {
        return await tradingEngineClient.getAssetProfitLoss(assetName);
    } catch (error) {
        throw new Error(`Error fetching profit-loss for ${assetName}: ${error.message}`);
    }
}

const getAssetLongLossLimit = async (assetName) => {
    try {
        return await tradingEngineClient.getAssetLongLossLimit(assetName);
    } catch (error) {
        throw new Error(`Error fetching asset long limit for ${assetName}: ${error.message}`);
    }
}

const getAssetShortLossLimit = async (assetName) => {
    try {
        return await tradingEngineClient.getAssetShortLossLimit(assetName);
    } catch (error) {
        throw new Error(`Error fetching asset short limit for ${assetName}: ${error.message}`);
    }
}

const getAssetEMA = async (assetName) => {
    try {
        return await tradingEngineClient.getAssetEMA(assetName);
    } catch (error) {
        throw new Error(`Error fetching asset EMA for ${assetName}: ${error.message}`);
    }
}

const closeAssetAllPositions = async (assetName) => {
    try {
        return await tradingEngineClient.closeAssetAllPositions(assetName);
    } catch (error) {
        throw new Error(`Error closing positions for asset: ${error.message}`);
    }
}

const removeAsset = async (assetName) => {
    try {
        return await tradingEngineClient.removeAsset(assetName);
    } catch (error) {
        throw new Error(`Error removing ${assetName}: ${error.message}`);
    }
}

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
