const TradingEngine = require('../utils/TradingEngine');

const getAction = async (newVal) => {
    try {
        TradingEngine.addPrice(newVal);
        const action = TradingEngine.analyzeSeriesForAction();
        return action; 
    } catch (error) {
        throw error; 
    }
}

module.exports = {
    getAction,
};
