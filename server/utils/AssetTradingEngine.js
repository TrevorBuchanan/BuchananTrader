// AssetTradingEngine.js
const Utils = require('../utils/utilFunctions');

class AssetTradingEngine {
    #minSeriesLen
    #sellFraction

    #assetName

    #priceSeries
    #currentPrice
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
    #maxLossLimit

    constructor(assetName) {
        this.#minSeriesLen = 3;
        this.#sellFraction = 1 / 4;
        this.#maxLossLimit = 1;

        this.#assetName = assetName;

        this.#priceSeries = [];
        this.#currentPrice = 0;

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

    getMinSeriesLength() {
        return this.#minSeriesLen;
    }

    getLongLossLimit() {
        if (this.#isLonging) {
            return this.#longLossLimit;
        }
        return null;
    }


    getShortLossLimit() {
        if (this.#isShorting) {
            return this.#shortLossLimit;
        }
        return null;
    }

    addPrice(price, time) {
        this.#currentPrice = price;
        this.#priceSeries.push({'price': price, 'time': time});
    }

    analyzeSeriesForAction() {
        if (this.#priceSeries.length < this.#minSeriesLen) {
            return "Not enough data to decide action";
        }
        const actions = [];

        // Loss limit updates
        this.#updateLimits()

        // Enter logic: Should we enter a long or short position?
        this.#long(actions)
        this.#short(actions)

        // Exit logic: Should we close a long or short position?
        this.#closeLong(actions)
        this.#closeShort(actions)

        // Hold if no other actions
        this.#hold(actions)

        return actions;
    }

    #updateLimits() {
        if (this.#isLonging) {
            this.#longLossLimit = Utils.lerp(this.#longLossLimit, this.#currentPrice, this.#sellFraction)
        }
        if (this.#isShorting) {
            this.#shortLossLimit = Utils.lerp(this.#shortLossLimit, this.#currentPrice, this.#sellFraction)
        }
    }

    #long(actions) {
        if (this.#shouldLong()) {
            this.#longEntryPrice = this.#currentPrice;
            this.#isLonging = true;
            this.#longLossLimit = this.#currentPrice - this.#maxLossLimit
            actions.push("Long");
        }
    }

    #closeLong(actions) {
        if (this.#shouldCloseLong()) {
            this.#profitLoss += this.#currentPrice - this.#longEntryPrice;
            this.#isLonging = false;
            actions.push("Close Long");
        }
    }

    #short(actions) {
        if (this.#shouldShort()) {
            this.#shortEntryPrice = this.#currentPrice;
            this.#isShorting = true;
            this.#shortLossLimit = this.#currentPrice + this.#maxLossLimit
            actions.push("Short");
        }
    }

    #closeShort(actions) {
        if (this.#shouldCloseShort()) {
            this.#profitLoss += this.#shortEntryPrice - this.#currentPrice;
            this.#isShorting = false;
            actions.push("Close Short");
        }
    }

    #hold(actions) {
        if (actions.length === 0) {
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
    }

    #shouldLong() {
        return Utils.upTrendForLength(this.#priceSeries, 3) && !this.#isLonging;
    }

    #shouldShort() {
        return Utils.downTrendForLength(this.#priceSeries, 3) && !this.#isShorting;
    }

    #shouldCloseLong() {
        return this.#isLonging && this.#currentPrice <= this.#longLossLimit;
    }

    #shouldCloseShort() {
        return this.#isShorting && this.#currentPrice >= this.#shortLossLimit;
    }
}

module.exports = AssetTradingEngine;
