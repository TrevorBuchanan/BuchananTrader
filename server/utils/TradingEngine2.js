const TradingEngine = require('./TradingEngine');

/**
 * ...
 */
class TradingEngine2 {
    constructor() {
        this.resistances = [];
        this.supports = [];

        this.isLonging = false;
        this.isShorting = false;
    }

    addValue(value) {
        this.priceSeries.push(value);
    }

    analyzeSeriesForAction() {
        throw new Error("Abstract method 'speak' must be implemented by subclasses");
    }
}

module.exports = new TradingEngine2();