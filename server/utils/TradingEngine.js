class TradingEngine {
    constructor() {
        this.resistances = [];
        this.supports = [];

        this.isLonging = false;
        this.isShorting = false;

        this.balance = 0;
    }

    addPrice(price) {
        this.priceSeries.push(price);
    }

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

    getProfitLoss() {
        return this.balance;
    }
}

module.exports = new TradingEngine();