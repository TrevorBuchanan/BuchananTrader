const tradingEngine = require('../config/tradingengine'); 

const getAction = async () => {
    try {
        const action = await tradingEngine.getAction(); // Directly call the getAction function
        return action; 
    } catch (error) {
        throw new Error(`Error fetching action: ${error.message}`);
    }
};

const addPrice = async (price) => {
    try {
        await tradingEngine.addPrice(price); // Directly call the addPrice function
    } catch (error) {
        throw new Error(`Error adding price to trading engine: ${error.message}`);
    }
};

const getProfitLoss = async () => {
    try {
        const profitLoss = await tradingEngine.getProfitLoss(); // Directly call the getProfitLoss function
        return profitLoss;
    } catch (error) {
        throw new Error(`Error fetching profit-loss: ${error.message}`);
    }
}

module.exports = {
    getAction,
    addPrice,
    getProfitLoss,
};
