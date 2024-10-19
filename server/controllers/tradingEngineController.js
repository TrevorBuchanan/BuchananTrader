const TradingEngineService = require('../services/tradingEngineService');

const TradingEngineController = {
    addAssetPrice: async (req, res) => {
        const { assetName, price } = req.body;

        // Validate input
        if (!assetName || typeof price !== 'number') {
            return res.status(400).json({ error: 'Invalid input: assetName is required and price must be a number.' });
        }

        try {
            await TradingEngineService.addAssetPrice(assetName, price);  
            const action = await TradingEngineService.getAssetAction(assetName);  
            res.json({ action });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
    getAssetAction: async (req, res) => {
        const { assetName } = req.body;

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
        const { assetName } = req.body;

        // Validate input
        if (!assetName) {
            return res.status(400).json({ error: 'Invalid input: assetName is required.' });
        }

        try {
            const profitLoss = await TradingEngineService.getAssetProfitLoss(assetName);
            res.json({ profitLoss });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = TradingEngineController;
