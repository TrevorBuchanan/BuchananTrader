const TradingEngine = require('./TradingEngine');

/**
 * Simple trading engine
 */
class TradingEngine1 extends TradingEngine {
    analyzeSeriesForAction() {
        if (this.priceSeries.length < 10) {
            return "Not enough data";
        }

        const latestValue = this.priceSeries[this.priceSeries.length - 1];
        const previousValue = this.priceSeries[this.priceSeries.length - 2];

        // Enter logic
        if (latestValue > previousValue) {
            return "Buy/Long";
        } else if (latestValue < previousValue) {
            return "Short/Sell";
        } else {
            return "Hold";
        }
    }
}

module.exports = new TradingEngine1();