const TradingEngine = require('../utils/TradingEngine');

const getAction = async () => {
    try {
        const action = TradingEngine.analyzeSeriesForAction();
        return action; 
    } catch (error) {
        throw error; 
    }
}

const addPrice = async (price) => {
    try {
        TradingEngine.addPrice(price);
    } catch (error) {
        throw error;
    }
}

const getProfitLoss = async () => {
    try {
        return TradingEngine.getProfitLoss();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAction,
    addPrice,
    getProfitLoss,
};
