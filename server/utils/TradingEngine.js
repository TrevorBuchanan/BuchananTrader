class TradingEngine {
    #MIN_SERIES_LENGTH

    #assetName

    #priceSeries
    #resistancesLines
    #supportsLines

    #profitLoss

    // TODO: Possibly change to multiple to not restrict to only one short or long at a time
    #longEntryPrice
    #shortEntryPrice
    #isLonging
    #isShorting

    #longLossLimit
    #shortLossLimit

    constructor(assetName) {
        this.#MIN_SERIES_LENGTH = 10;

        this.#assetName = assetName;

        this.#priceSeries = [];

        this.#resistancesLines = [];
        this.#supportsLines = [];

        this.#isLonging = false;
        this.#isShorting = false;

        this.#profitLoss = 0;

        this.#longEntryPrice = 0;
        this.#shortEntryPrice = 0;

        this.#longLossLimit = 0;
        this.#shortLossLimit = 0;  
    }

    getAssetName() {
        return this.#assetName;
    }

    addPrice(price) {
        this.#priceSeries.push(price);
    }

    analyzeSeriesForAction() {
        if (this.#priceSeries.length < this.#MIN_SERIES_LENGTH) {
            return "Not enough data to decide action";
        }
        const actions = [];

        const latestValue = this.#priceSeries[this.#priceSeries.length - 1];

        // Enter logic: Should we enter a long or short position?
        if (this.#shouldLong()) {
            this.#longEntryPrice = latestValue;
            this.#isLonging = true;
            this.#isShorting = false;
            actions.push("Long");
        } else if (this.#shouldShort()) {
            this.#shortEntryPrice = latestValue;
            this.#isShorting = true;
            this.#isLonging = false;
            actions.push("Short");
        }

        // Exit logic: Should we close a long or short position?
        if (this.#isLonging && this.#shouldCloseLong()) {
            this.#profitLoss += latestValue - this.#longEntryPrice;
            this.#isLonging = false;
            actions.push("Close Long");
        } else if (this.#isShorting && this.#shouldCloseShort()) {
            this.#profitLoss += this.#shortEntryPrice - latestValue;
            this.#isShorting = false;
            actions.push("Close Short");
        }

        if(actions.length == 0) {
            return ["Hold"];
        } else {
            return actions;
        }
    }

    #upTrendForLength(length) {
        if (this.#priceSeries.length < length) return false;
        for (let i = this.#priceSeries.length - length; i < this.#priceSeries.length - 1; i++) {
            if (this.#priceSeries[i] >= this.#priceSeries[i + 1]) {
                return false;
            }
        }
        return true;
    }

    #downTrendForLength(length) {
        if (this.#priceSeries.length < length) return false;
        for (let i = this.#priceSeries.length - length; i < this.#priceSeries.length - 1; i++) {
            if (this.#priceSeries[i] <= this.#priceSeries[i + 1]) {
                return false;
            }
        }
        return true;
    }

    #shouldLong() {
        return this.#upTrendForLength(2) && !this.#isLonging;
    }

    #shouldShort() {
        return this.#downTrendForLength(2) && !this.#isShorting;
    }

    #shouldCloseLong () {
        return this.#downTrendForLength(2);
    }

    #shouldCloseShort () {
        return this.#upTrendForLength(2);
    }

    getProfitLoss() {
        return this.#profitLoss;
    }
}

module.exports = new TradingEngine();