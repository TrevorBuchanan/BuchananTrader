// tradingengine.test.js
const tradingEngine = require('../../config/tradingengine');
const TradingEngineManager = require('../../utils/TradingEngineManager');

// Automatically mock the TradingEngineManager
jest.mock('../../utils/TradingEngineManager');

describe('Trading Engine Tests', () => {
    let assetName;
    let price;
    let time;

    beforeEach(() => {
        assetName = 'BTC-USD';
        price = 50000;
        time = new Date().toISOString();
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    test('getAssetAction should return the action for the asset', async () => {
        const mockAction = 'buy';
        
        // Set up the mock implementation
        TradingEngineManager.prototype.getAssetAction.mockResolvedValue(mockAction);

        const action = await tradingEngine.getAssetAction(assetName);
        expect(action).toBe(mockAction);
        expect(TradingEngineManager.prototype.getAssetAction).toHaveBeenCalledWith(assetName);
    });

    /**
     * 
     */
    test('addAssetPrice should call addAssetPrice on tradingEngineManager', async () => {
        await tradingEngine.addAssetPrice(assetName, price, time);
        expect(TradingEngineManager.prototype.addAssetPrice).toHaveBeenCalledWith(assetName, price, time);
    });

    /**
     * Testing getAssetProfitLoss
     */
    test('getAssetProfitLoss should return the profit/loss for the asset', async () => {
        const mockProfitLoss = 1000;

        // Set up the mock implementation
        TradingEngineManager.prototype.getAssetProfitLoss.mockResolvedValue(mockProfitLoss);

        const profitLoss = await tradingEngine.getAssetProfitLoss(assetName);
        expect(profitLoss).toBe(mockProfitLoss);
        expect(TradingEngineManager.prototype.getAssetProfitLoss).toHaveBeenCalledWith(assetName);
    });

    /**
     * Testing removeAsset Success
     */
    test('removeAsset should return success message when asset is removed', async () => {
        const mockMessage = `Trading engine for ${assetName} removed.`;

        // Set up the mock implementation
        TradingEngineManager.prototype.removeAssetTradingEngine.mockResolvedValue(mockMessage);

        const result = await tradingEngine.removeAsset(assetName);
        expect(result).toBe(mockMessage);
        expect(TradingEngineManager.prototype.removeAssetTradingEngine).toHaveBeenCalledWith(assetName);
    });


    /**
     * Testing removeAsset Failure
     */
    test('removeAsset should throw error when removal fails', async () => {
        const mockError = new Error('Removal failed');
        
        // Set up the mock implementation to throw an error
        TradingEngineManager.prototype.removeAssetTradingEngine.mockImplementation(() => {
            throw mockError;
        });

        await expect(tradingEngine.removeAsset(assetName)).rejects.toThrow('Error removing asset: Removal failed');
    });
});
