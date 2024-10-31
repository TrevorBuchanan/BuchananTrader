// AssetTradingEngine.test.js

const AssetTradingEngine = require('../../utils/AssetTradingEngine');

describe('Asset Trading Engine Tests', () => {
    let tradingEngine;
    let assetName;
    let price;
    let time;

    beforeEach(() => {
        assetName = 'Example Asset';
        price = 50000;
        time = new Date().toISOString();
        tradingEngine = new AssetTradingEngine(assetName);
    });

    afterEach(() => {
        // None for now
    });

    /**
     * Testing getProfitLoss 
     */
    test('should return initial profit/loss of 0', () => {
        expect(tradingEngine.getProfitLoss()).toBe(0);
    });

    /**
     * Testing getAssetName
     */
    test('should return the correct asset name', () => {
        expect(tradingEngine.getAssetName()).toBe(assetName);
    });

    /**
     * Testing addPrice
     */
    test('should add a new price entry to the price series', () => {
        tradingEngine.addPrice(price, time);
        const priceSeries = tradingEngine.analyzeSeriesForAction();  // We use analyzeSeriesForAction to access priceSeries indirectly
        expect(priceSeries).toBeDefined();
        expect(priceSeries[priceSeries.length - 1]).toEqual({ price, time });
    });

    /**
     * Testing analyzeSeriesForAction when not enough data
     */
    test('should return "Not enough data to decide action" if price series is shorter than minimum length', () => {
        for (let i = 0; i < 9; i++) {
            tradingEngine.addPrice(price, new Date().toISOString());
        }
        expect(tradingEngine.analyzeSeriesForAction()).toEqual("Not enough data to decide action");
    });

    /**
     * Testing analyzeSeriesForAction when sufficient data and constant series
     */
    test('should return "Hold" if no entry/exit conditions are met', () => {
        for (let i = 0; i < 10; i++) {
            tradingEngine.addPrice(price, new Date().toISOString());
        }
        expect(tradingEngine.analyzeSeriesForAction()).toEqual(["Hold"]);
    });

    // TODO: Add analyze series for action for more series options
    
    /**
     * Testing upTrendForLength
     */
    test('should return true for an uptrend of specified length', () => {
        // Set up an uptrend of 3 prices
        tradingEngine.addPrice(100, new Date().toISOString());
        tradingEngine.addPrice(200, new Date().toISOString());
        tradingEngine.addPrice(300, new Date().toISOString());

        expect(tradingEngine.upTrendForLength(3)).toBe(true);  // Should be true for 3-length uptrend
    });

    test('should return false if uptrend condition is not met', () => {
        // Prices are not in an uptrend
        tradingEngine.addPrice(300, new Date().toISOString());
        tradingEngine.addPrice(200, new Date().toISOString());
        tradingEngine.addPrice(100, new Date().toISOString());

        expect(tradingEngine.upTrendForLength(3)).toBe(false);  // Should be false
    });

    test('should return false if price series length is less than specified uptrend length', () => {
        // Not enough data points to verify a 3-length uptrend
        tradingEngine.addPrice(100, new Date().toISOString());
        tradingEngine.addPrice(200, new Date().toISOString());

        expect(tradingEngine.upTrendForLength(3)).toBe(false);  // Should be false as only 2 points
    });

    /**
     * Testing downTrendForLength
     */
    test('should return true for a downtrend of specified length', () => {
        // Set up a downtrend of 3 prices
        tradingEngine.addPrice(300, new Date().toISOString());
        tradingEngine.addPrice(200, new Date().toISOString());
        tradingEngine.addPrice(100, new Date().toISOString());

        expect(tradingEngine.downTrendForLength(3)).toBe(true);  // Should be true for 3-length downtrend
    });

    test('should return false if downtrend condition is not met', () => {
        // Prices are not in a downtrend
        tradingEngine.addPrice(100, new Date().toISOString());
        tradingEngine.addPrice(200, new Date().toISOString());
        tradingEngine.addPrice(300, new Date().toISOString());

        expect(tradingEngine.downTrendForLength(3)).toBe(false);  // Should be false
    });

    test('should return false if price series length is less than specified downtrend length', () => {
        // Not enough data points to verify a 3-length downtrend
        tradingEngine.addPrice(300, new Date().toISOString());
        tradingEngine.addPrice(200, new Date().toISOString());

        expect(tradingEngine.downTrendForLength(3)).toBe(false);  // Should be false as only 2 points
    });
});
