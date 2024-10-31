const TradingEngineManager = require('../../utils/TradingEngineManager');
const AssetTradingEngine = require('../../utils/AssetTradingEngine');

jest.mock('../../utils/AssetTradingEngine'); // Mock the AssetTradingEngine module

describe('Trading Engine Manager Tests', () => {
    let tradingEngineManager;
    let assetName;
    let price;
    let time;

    beforeEach(() => {
        assetName = 'Example Asset';
        price = 50000;
        time = new Date().toISOString();
        tradingEngineManager = new TradingEngineManager(); // Instantiate the TradingEngineManager for each test
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    /**
     * Testing getAssetAction success
     */
    test('getAssetAction should return the action for the asset when successful', async () => {
        const mockAction = 'Hold';

        // Mock analyzeSeriesForAction method on the AssetTradingEngine instance
        AssetTradingEngine.prototype.analyzeSeriesForAction.mockResolvedValue(mockAction);

        const action = await tradingEngineManager.getAssetAction(assetName);
        expect(action).toBe(mockAction);
        expect(AssetTradingEngine.prototype.analyzeSeriesForAction).toHaveBeenCalled();
    });

    /**
     * Testing getAssetAction failure
     */
    test('getAssetAction should throw error when failed', async () => {
        const mockError = new Error('Get asset action failed');

        // Mock analyzeSeriesForAction to throw an error
        AssetTradingEngine.prototype.analyzeSeriesForAction.mockImplementation(() => {
            throw mockError;
        });

        await expect(tradingEngineManager.getAssetAction(assetName)).rejects.toThrow(
            'Get asset action failed'
        );
    });

    /**
     * Testing addAssetPrice success
     */
    test('addAssetPrice should call addPrice on AssetTradingEngine when successful', async () => {
        await tradingEngineManager.addAssetPrice(assetName, price, time);
        expect(AssetTradingEngine).toHaveBeenCalledWith(assetName); // Ensure AssetTradingEngine instance was created
        expect(AssetTradingEngine.prototype.addPrice).toHaveBeenCalledWith(price, time);
    });

    /**
     * Testing addAssetPrice failure
     */
    test('addAssetPrice should throw error when failed', async () => {
        const mockError = new Error('Add asset price failed');

        // Mock addPrice to throw an error
        AssetTradingEngine.prototype.addPrice.mockImplementation(() => {
            throw mockError;
        });

        await expect(tradingEngineManager.addAssetPrice(assetName, price, time)).rejects.toThrow(
            'Add asset price failed'
        );
    });

    /**
     * Testing getAssetProfitLoss success
     */
    test('getAssetProfitLoss should return the profit/loss for the asset when successful', async () => {
        const mockProfitLoss = 1000;

        // Mock getProfitLoss on AssetTradingEngine instance
        AssetTradingEngine.prototype.getProfitLoss.mockResolvedValue(mockProfitLoss);

        const profitLoss = await tradingEngineManager.getAssetProfitLoss(assetName);
        expect(profitLoss).toBe(mockProfitLoss);
        expect(AssetTradingEngine.prototype.getProfitLoss).toHaveBeenCalled();
    });

    /**
     * Testing getAssetProfitLoss failure
     */
    test('getAssetProfitLoss should throw error when failed', async () => {
        const mockError = new Error('Get asset profit/loss failed');

        // Mock getProfitLoss to throw an error
        AssetTradingEngine.prototype.getProfitLoss.mockImplementation(() => {
            throw mockError;
        });

        await expect(tradingEngineManager.getAssetProfitLoss(assetName)).rejects.toThrow(
            'Get asset profit/loss failed'
        );
    });

    /**
     * Testing removeAsset success
     */
    test('removeAsset should return success message when asset is removed', async () => {
        const mockMessage = `Trading engine for ${assetName} removed.`;

        // Ensure the trading engine is created
        await tradingEngineManager.addAssetPrice(assetName, price, time);

        const result = tradingEngineManager.removeAssetTradingEngine(assetName);
        expect(result).toBe(mockMessage);
        expect(AssetTradingEngine).toHaveBeenCalledWith(assetName);
    });

    /**
     * Testing removeAsset failure
     */
    test('removeAsset should throw error when removal fails', async () => {
        const mockError = new Error(`No trading engine for ${assetName}`);

        await expect(() => tradingEngineManager.removeAssetTradingEngine(assetName)).toThrow(
            mockError
        );
    });
});
