class TradingEngine {
    constructor() {
        if (new.target === TradingEngine) {
            throw new Error("Cannot instantiate an abstract class!");
        }
    }

    addPrice(price) {
        this.priceSeries.push(price);
    }

    analyzeSeriesForAction() {
        throw new Error("Abstract method 'speak' must be implemented by subclasses");
    }
}

module.exports = new TradingEngine();