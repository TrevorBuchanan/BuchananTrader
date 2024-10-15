const MockBuyerService = require('../services/TradingEngineService');

const MockBuyerController = {
    addValueAndAnalyze: (req, res) => {
        const { value } = req.body; // Expecting 'value' in the request body
        
        // Add the value to the series
        MockBuyerService.addValue(value);

        // Analyze the series and get the decision
        const decision = MockBuyerService.analyzeSeries();

        // Send the decision back to the frontend
        res.json({ decision });
    }
};

module.exports = MockBuyerController;
