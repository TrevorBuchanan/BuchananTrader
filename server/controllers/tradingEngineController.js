const TradingEngineService = require('../services/tradingEngineService');

const TradingEngineController = {
    addAssetPrice: async (req, res) => {
        const { assetName, price, time } = req.body;
        const parsedPrice = Number(price);
        // Validate input
        if (!assetName || isNaN(parsedPrice)) {
            return res.status(400).json({ error: 'Invalid input: assetName is required and price must be a number.' });
        }
        

        try {
            await TradingEngineService.addAssetPrice(assetName, parsedPrice, time);  
              // Return success message and status code 200
            res.status(200).json({ message: 'Price added successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
    getAssetAction: async (req, res) => {
        const { assetName } = req.query;

        // Validate input
        if (!assetName) {
            return res.status(400).json({ error: 'Invalid input: assetName is required.' });
        }
        
        try {
            const action = await TradingEngineService.getAssetAction(assetName);
            res.json({ action });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAssetProfitLoss: async (req, res) => {
        const { assetName } = req.query;  

        // Validate input
        if (!assetName) {
            return res.status(400).json({ error: 'Invalid input: assetName is required.' });
        }
    
        try {
            const profitLoss = await TradingEngineService.getAssetProfitLoss(assetName);
            res.json({ profitLoss });
        } catch (error) {
            console.error('Error fetching profit/loss:', error);  // Log the error for debugging
            res.status(500).json({ error: error.message });
        }
    },

    removeAsset: async (req, res) => {
        const { assetName } = req.params;  

        // Validate input
        if (!assetName) {
            return res.status(400).json({ error: 'Invalid input: assetName is required.' });
        }
        try {
            resultMsg = await TradingEngineService.removeAsset(assetName);
            return resultMsg;
        } catch (error) {
            console.error('Error deleting asset', error);  
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = TradingEngineController;
