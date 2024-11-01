// AssetTradingEngine.js

// console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++");
// console.log(this.#isLonging);
// console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++");

class AssetTradingEngine {
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

    getProfitLoss() {
        return this.#profitLoss;
    }

    getAssetName() {
        return this.#assetName;
    }

    getPriceSeries() {
        return this.#priceSeries;
    }

    addPrice(price, time) {
        this.#priceSeries.push({'price': price, 'time': time});
    }

    analyzeSeriesForAction() {
        if (this.#priceSeries.length < this.#MIN_SERIES_LENGTH) {
            return "Not enough data to decide action";
        }
        const actions = [];

        const latestValue = this.#priceSeries[this.#priceSeries.length - 1]['price'];

        // Enter logic: Should we enter a long or short position?
        if (this.#shouldLong()) {
            this.#longEntryPrice = latestValue;
            this.#isLonging = true;
            actions.push("Long");
        } 
        if (this.#shouldShort()) {
            this.#shortEntryPrice = latestValue;
            this.#isShorting = true;
            actions.push("Short");
        }

        // Exit logic: Should we close a long or short position?
        if (this.#shouldCloseLong()) {
            this.#profitLoss += latestValue - this.#longEntryPrice;
            this.#isLonging = false;
            actions.push("Close Long");
        }
        if (this.#shouldCloseShort()) {
            this.#profitLoss += this.#shortEntryPrice - latestValue;
            this.#isShorting = false;
            actions.push("Close Short");
        }

        if(actions.length == 0) {
            if (this.#isLonging) {
                actions.push("Hold Long");
            }
            if (this.#isShorting) {
                actions.push("Hold Short");
            }
            if (!this.#isLonging && !this.#isShorting) {
                actions.push("No Action");
            }
        }
        return actions;
    }

    upTrendForLength(length) {
        if (this.#priceSeries.length < length) return false;
        for (let i = this.#priceSeries.length - length; i < this.#priceSeries.length - 1; i++) {
            if (this.#priceSeries[i]['price'] >= this.#priceSeries[i + 1]['price']) {
                return false;
            }
        }
        return true;
    }

    downTrendForLength(length) {
        if (this.#priceSeries.length < length) return false;
        for (let i = this.#priceSeries.length - length; i < this.#priceSeries.length - 1; i++) {
            if (this.#priceSeries[i]['price'] <= this.#priceSeries[i + 1]['price']) {
                return false;
            }
        }
        return true;
    }

    #shouldLong() {
        return this.upTrendForLength(2) && !this.#isLonging;
    }

    #shouldShort() {
        return this.downTrendForLength(2) && !this.#isShorting;
    }

    #shouldCloseLong () {
        return this.#isLonging && this.downTrendForLength(2);
    }

    #shouldCloseShort () {
        return this.#isShorting && this.upTrendForLength(2);
    }
}

module.exports = AssetTradingEngine;
