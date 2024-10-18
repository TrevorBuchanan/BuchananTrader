class TradingEngine {
    #priceSeries
    #minSeriesLen
    #resistancesLines
    #supportsLines
    #isLonging
    #isShorting
    #balance

    constructor() {
        this.#priceSeries = []

        this.#minSeriesLen = 10;

        this.#resistancesLines = [];
        this.#supportsLines = [];

        this.#isLonging = false;
        this.#isShorting = false;

        this.#balance = 0;
    }

    addPrice(price) {
        this.#priceSeries.push(price);
    }

    analyzeSeriesForAction() {
        if (this.#priceSeries.length < this.#minSeriesLen) {
            return "Not enough data to decide action";
        }

        const latestValue = this.#priceSeries[this.#priceSeries.length - 1];
        const previousValue = this.#priceSeries[this.#priceSeries.length - 2];

        // Enter logic
        if (latestValue > previousValue && !this.#isLonging) {
            this.#isLonging = true;
            return "Long";
        } else if (latestValue < previousValue && !this.#isShorting) {
            this.#isShorting = true;
            return "Short";
        }

        // Exit logic
        if (latestValue < previousValue && !this.#isShorting) {

        }
    }

    #upTrendForLength(length) {

    }

    #downTrendForLength(length) {

    }

    #shouldLong() {

    }

    #shouldShort() {
        
    }

    #shouldShortSell () {

    }

    #shouldLongSell () {

    }

    getProfitLoss() {
        return this.#balance;
    }
}

module.exports = new TradingEngine();