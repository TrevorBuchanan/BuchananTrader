// AssetTradingEngine.test.js

const AssetTradingEngine = require('../../utils/AssetTradingEngine');

describe('Asset Trading Engine', () => {
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
     * Testing getAssetName
     */
    test('should return the correct price series', () => {
        expect(tradingEngine.getPriceSeries()).toStrictEqual([]);
    });

    /**
     * Testing addPrice
     */
    test('should add a new price entry to the price series', () => {
        tradingEngine.addPrice(price, time);
        const priceSeries = tradingEngine.getPriceSeries();  // We use analyzeSeriesForAction to access priceSeries indirectly
        expect(priceSeries).toBeDefined();
        expect(priceSeries[priceSeries.length - 1]).toEqual({ price, time });
    });

    /**
     * Testing analyzeSeriesForAction
     */
    test('should return entry/exit actions according to series', () => {
        // Not enough data test
        for (let i = 0; i < tradingEngine.getMinSeriesLength() - 1; i++) {
            tradingEngine.addPrice(price, new Date().toISOString());
        }
        expect(tradingEngine.analyzeSeriesForAction()).toEqual("Not enough data to decide action");
        
        // No action test
        tradingEngine.addPrice(price, new Date().toISOString());
        expect(tradingEngine.analyzeSeriesForAction()).toEqual(["No Action"]);

        // Long action test
        tradingEngine.addPrice(price + 1, new Date().toISOString());
        tradingEngine.addPrice(price + 2, new Date().toISOString()); // Double increase
        expect(tradingEngine.analyzeSeriesForAction()).toEqual(["Long"]); // Should expect long initially 

        // Hold Long action test
        expect(tradingEngine.analyzeSeriesForAction()).toEqual(["Hold Long"]); // Once longing should expect Hold

        // Short and Close Long test
        tradingEngine.addPrice(price - 1, new Date().toISOString());
        tradingEngine.addPrice(price - 2, new Date().toISOString()); // Double decrease
        expect(tradingEngine.analyzeSeriesForAction()).toEqual(["Short", "Close Long"]); // Decreased twice so short and close long

        // Hold Short test
        expect(tradingEngine.analyzeSeriesForAction()).toEqual(["Hold Short"]); // No change so hold short

        tradingEngine.addPrice(price + 1, new Date().toISOString());
        tradingEngine.addPrice(price + 2, new Date().toISOString()); // Double increase
        expect(tradingEngine.analyzeSeriesForAction()).toEqual(["Long", "Close Short"]); // Increased so close short and start long
    });

    // TODO: Add analyze series for action for more series options
});
