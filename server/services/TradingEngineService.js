const tradingEngineClient = require('../config/tradingengine'); 

const getAssetAction = async (assetName) => {
    try {
        const action = await tradingEngineClient.getAssetAction(assetName);
        return action; 
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
        const profitLoss = await tradingEngineClient.getAssetProfitLoss(assetName); 
        return profitLoss;
    } catch (error) {
        throw new Error(`Error fetching profit-loss for ${assetName}: ${error.message}`);
    }
}

const removeAsset = async (assetName) => {
    try {
        resultMsg = await tradingEngineClient.removeAsset(assetName);
        return resultMsg;
    } catch (error) {
        throw new Error(`Error removing ${assetName}: ${error.message}`);
    }
}

module.exports = {
    getAssetAction,
    addAssetPrice,
    getAssetProfitLoss,
    removeAsset,
};
