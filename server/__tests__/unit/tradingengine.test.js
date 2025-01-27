// tradingengine.test.js

const tradingEngine = require('../../config/tradingengine');
const TradingEngineManager = require('../../utils/TradingEngineManager');

jest.mock('../../utils/TradingEngineManager');

describe('Trading Engine Config', () => {
    let assetName;
    let price;
    let time;

    beforeEach(() => {
        assetName = 'Example Asset';
        price = 50000;
        time = new Date().toISOString();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    /**
     * Testing getAssetAction success
     */
    test('getAssetAction should return the action for the asset when successful', async () => {
        const mockAction = 'Hold'; // Example action

        TradingEngineManager.prototype.getAssetAction.mockResolvedValue(mockAction);

        const action = await tradingEngine.getAssetAction(assetName);
        expect(action).toBe(mockAction);
        expect(TradingEngineManager.prototype.getAssetAction).toHaveBeenCalledWith(assetName);
    });

    /**
     * Testing getAssetAction failure
     */
    test('getAssetAction should throw error when failed', async () => {
        const mockError = new Error('Get asset action failed');

        // Set up the mock implementation to throw an error
        TradingEngineManager.prototype.getAssetAction.mockImplementation(() => {
            throw mockError;
        });

        await expect(tradingEngine.getAssetAction(assetName)).rejects.toThrow('Error getting asset action: Get asset action failed');
    });

    /**
     * Testing addAssetPrice success
     */
    test('addAssetPrice should call addAssetPrice on tradingEngineManager when successful', async () => {
        await tradingEngine.addAssetPrice(assetName, price, time);
        expect(TradingEngineManager.prototype.addAssetPrice).toHaveBeenCalledWith(assetName, price, time);
    });

    /**
     * Testing addAssetPrice failure
     */
    test('addAssetPrice should throw error when failed', async () => {
        const mockError = new Error('Add asset price failed');

        // Set up the mock implementation to throw an error
        TradingEngineManager.prototype.addAssetPrice.mockImplementation(() => {
            throw mockError;
        });

        await expect(tradingEngine.addAssetPrice(assetName, price)).rejects.toThrow('Error adding asset price: Add asset price failed');
    });

    /**
     * Testing getAssetProfitLoss success
     */
    test('getAssetProfitLoss should return the profit/loss for the asset when successful', async () => {
        const mockProfitLoss = 1000;

        // Set up the mock implementation
        TradingEngineManager.prototype.getAssetProfitLoss.mockResolvedValue(mockProfitLoss);

        const profitLoss = await tradingEngine.getAssetProfitLoss(assetName);
        expect(profitLoss).toBe(mockProfitLoss);
        expect(TradingEngineManager.prototype.getAssetProfitLoss).toHaveBeenCalledWith(assetName);
    });

    /**
     * Testing getAssetProfitLoss failure
     */
    test('getAssetProfitLoss should throw error when failed', async () => {
        const mockError = new Error('Get asset profit/loss failed');

        // Set up the mock implementation to throw an error
        TradingEngineManager.prototype.getAssetProfitLoss.mockImplementation(() => {
            throw mockError;
        });

        await expect(tradingEngine.getAssetProfitLoss(assetName)).rejects.toThrow('Error getting asset profit loss: Get asset profit/loss failed');
    });

    /**
     * Testing getAssetLongLossLimit Success
     */
    test('getAssetLongLossLimit should return the current long loss limit for the asset when successful', async () => {
        const mockLongLossLimit = 1000;
        TradingEngineManager.prototype.getAssetLongLossLimit.mockResolvedValue(mockLongLossLimit);
        const longLossLimit = await tradingEngine.getAssetLongLossLimit(assetName);
        expect(longLossLimit).toBe(mockLongLossLimit);
        expect(TradingEngineManager.prototype.getAssetLongLossLimit).toHaveBeenCalledWith(assetName);
    });

    /**
     * Testing getAssetLongLossLimit Failure
     */
    test('getAssetLongLossLimit should throw error when failed', async () => {
        const mockError = new Error('Get asset long loss limit failed');
        TradingEngineManager.prototype.getAssetLongLossLimit.mockImplementation(() => {
            throw mockError;
        })
        await expect(tradingEngine.getAssetLongLossLimit(assetName)).rejects.toThrow('Error getting asset long loss limit: Get asset long loss limit failed');
    });

    /**
     * Testing getAssetShortLossLimit Success
     */
    test('getAssetShortLossLimit should return the current short loss limit for the asset when successful', async () => {
        const mockShortLossLimit = 1000;
        TradingEngineManager.prototype.getAssetShortLossLimit.mockResolvedValue(mockShortLossLimit);
        const shortLossLimit = await tradingEngine.getAssetShortLossLimit(assetName);
        expect(shortLossLimit).toBe(mockShortLossLimit);
        expect(TradingEngineManager.prototype.getAssetShortLossLimit).toHaveBeenCalledWith(assetName);
    });

    /**
     * Testing getAssetShortLossLimit Success
     */
    test('getAssetShortLossLimit should throw error when failed', async () => {
        const mockError = new Error('Get asset short loss limit failed');
        TradingEngineManager.prototype.getAssetShortLossLimit.mockImplementation(() => {
            throw mockError;
        })
        await expect(tradingEngine.getAssetShortLossLimit(assetName)).rejects.toThrow('Error getting asset short loss limit: Get asset short loss limit failed');
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
