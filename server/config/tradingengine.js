class TradingEngine {
    constructor() {
        this.priceSeries = [];
        this.
        this.isLonging = false;
        this.isShorting = false;
    }

    addValue(value) {
        this.priceSeries.push(value);
    }

    analyzeSeries() {
        if (this.priceSeries.length < 10) {
            return "Not enough data";
        }

        const latestValue = this.priceSeries[this.priceSeries.length - 1];
        const previousValue = this.priceSeries[this.priceSeries.length - 2];

        // Enter logic
        if (latestValue > previousValue && !this.isLonging) {
            this.isLonging = true;
            return "Buy/Long";
        } else if (latestValue < previousValue && !this.isShorting) {
            this.isShorting = true;
            return "Short/Sell";
        } else {
            return "Hold";
        }
    }
}

module.exports = new TradingEngine();