const client = require('../config/tradingengine'); 

const getAction = async () => {
    try {
        const response = await client.makeRequest('GET', '/getAction'); 
        return response.data || response; 
    } catch (error) {
        throw new Error(`Error fetching action: ${error.message}`);
    }
};

const addPrice = async (price) => {
    try {
        await client.makeRequest('POST', '/addPrice', { price }); 
    } catch (error) {
        throw new Error(`Error adding price to trading engine: ${error.message}`);
    }
};

module.exports = {
    getAction,
    addPrice,
};
