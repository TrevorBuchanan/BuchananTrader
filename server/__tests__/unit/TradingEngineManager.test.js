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

        AssetTradingEngine.prototype.analyzeSeriesForAction = jest.fn().mockReturnValue('Hold');
        AssetTradingEngine.prototype.addPrice = jest.fn();
        AssetTradingEngine.prototype.getProfitLoss = jest.fn().mockReturnValue(100);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    /**
     * Testing getTradingEngines
     */
    test('getTradingEngines should return the current list of trading engines', () => {
        expect(tradingEngineManager.getTradingEngines()).toStrictEqual({});
    })

    /**
     * Testing addAssetPrice
     */
    test('addAssetPrice should add a price to an existing asset', () => {
        tradingEngineManager.addAssetPrice(assetName, price, time); // Add and initialize
        tradingEngineManager.addAssetPrice(assetName, price, time); // Add to existing
        expect(AssetTradingEngine).toHaveBeenCalledWith(assetName);
        expect(AssetTradingEngine.prototype.addPrice).toHaveBeenCalledWith(price, time);
    });

    /**
     * Testing getAssetProfitLoss
     */
    test('getAssetProfitLoss should return profit/loss for an existing asset', () => {
        tradingEngineManager.addAssetPrice(assetName, price, time); // Ensuring asset exists
        const profitLoss = tradingEngineManager.getAssetProfitLoss(assetName);
        expect(AssetTradingEngine.prototype.getProfitLoss).toHaveBeenCalled();
        expect(profitLoss).toBe(100);
    });

    test('getAssetProfitLoss should initialize AssetTradingEngine if asset does not exist', () => {
        const profitLoss = tradingEngineManager.getAssetProfitLoss(assetName);
        expect(AssetTradingEngine).toHaveBeenCalledWith(assetName);
        expect(AssetTradingEngine.prototype.getProfitLoss).toHaveBeenCalled();
        expect(profitLoss).toBe(100);
    });

    /**
     * Testing getAssetAction
     */
    test('getAssetAction should return action for an existing asset', () => {
        tradingEngineManager.addAssetPrice(assetName, price, time); // Ensuring asset exists
        const action = tradingEngineManager.getAssetAction(assetName);
        expect(AssetTradingEngine.prototype.analyzeSeriesForAction).toHaveBeenCalled();
        expect(action).toBe('Hold');
    });

    test('getAssetAction should initialize AssetTradingEngine if asset does not exist', () => {
        const action = tradingEngineManager.getAssetAction(assetName);
        expect(AssetTradingEngine).toHaveBeenCalledWith(assetName);
        expect(AssetTradingEngine.prototype.analyzeSeriesForAction).toHaveBeenCalled();
        expect(action).toBe('Hold');
    });

    /**
     * Testing removeAssetTradingEngine
     */
    test('removeAssetTradingEngine should remove an existing asset', () => {
        tradingEngineManager.addAssetPrice(assetName, price, time); // Ensuring asset exists
        const result = tradingEngineManager.removeAssetTradingEngine(assetName);
        expect(tradingEngineManager.getTradingEngines()).not.toHaveProperty(assetName);
        expect(result).toBe(`Trading engine for ${assetName} removed.`);
    });

    test('removeAssetTradingEngine should throw error for non-existent asset', () => {
        expect(() => tradingEngineManager.removeAssetTradingEngine(assetName)).toThrow(`No trading engine for ${assetName}`);
    });
});
