const TradingEngineService = require('../services/tradingEngineService');

const TradingEngineController = {
    addPrice: async (req, res) => {
        const { price } = req.body;
        try {
            await TradingEngineService.addPrice(price);  
            const action = await TradingEngineService.getAction();  
            res.json({ action });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
    getAction: async (req, res) => {
        try {
            const action = await TradingEngineService.getAction();
            res.json({ action });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = TradingEngineController;