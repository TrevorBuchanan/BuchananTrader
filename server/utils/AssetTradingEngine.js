// AssetTradingEngine.js
const Utils = require('./utilFunctions');
const EMA = require('./EMA');

class AssetTradingEngine {
    #minSeriesLen
    #sellFraction

    #assetName

    #priceSeries
    #currentPrice

    #profitLoss

    // TODO: Possibly change to multiple to not restrict to only one short or long at a time
    #longEntryPrice
    #shortEntryPrice
    #isLonging
    #isShorting
    #justClosedLong
    #justClosedShort

    #longLossLimit
    #shortLossLimit
    #maxLossLimit

    #ema
    #emaWindowSize
    #emaSeries

    constructor(assetName) {
        this.#minSeriesLen = 3;
        this.#sellFraction = 1 / 4;
        this.#maxLossLimit = 1;

        this.#assetName = assetName;

        this.#priceSeries = [];
        this.#currentPrice = 0;

        this.#isLonging = false;
        this.#isShorting = false;

        this.#justClosedLong = false;
        this.#justClosedShort = false;

        this.#profitLoss = 0;

        this.#longEntryPrice = 0;
        this.#shortEntryPrice = 0;

        this.#longLossLimit = 0;
        this.#shortLossLimit = 0;

        this.#emaWindowSize = 5
        this.#ema = new EMA(this.#emaWindowSize);
        this.#emaSeries = []
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
        if (this.#justClosedLong) {
            this.#justClosedLong = false;
            return this.#longLossLimit;
        }
        if (this.#isLonging) {
            return this.#longLossLimit;
        }
        return null;
    }


    getShortLossLimit() {
        if (this.#justClosedShort) {
            this.#justClosedShort = false;
            return this.#shortLossLimit;
        }
        if (this.#isShorting) {
            return this.#shortLossLimit;
        }
        return null;
    }

    addPrice(price, time) {
        this.#currentPrice = price;
        this.#priceSeries.push({'price': price, 'time': time});
        this.#emaSeries.push({'price': this.#ema.update(price), 'time': time});
    }

    closeAllPositions() {
        if (this.#isLonging) {
            this.#justClosedLong = true;
            this.#profitLoss += this.#currentPrice - this.#longEntryPrice;
            this.#isLonging = false;
        }
        if (this.#isShorting) {
            this.#justClosedShort = true;
            this.#profitLoss += this.#shortEntryPrice - this.#currentPrice;
            this.#isShorting = false;
        }
    }

    analyzeSeriesForAction() {
        if (this.#priceSeries.length < this.#minSeriesLen) {
            return "Not enough data to decide action";
        }
        this.#justClosedLong = false;
        this.#justClosedShort = false;
        const actions = [];

        const price = this.#ema.current();

        // Loss limit updates
        this.#updateLimits(price)

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

    #updateLimits(price) { // TODO: Test with current price and ema price
        if (this.#isLonging) {
            this.#longLossLimit = Utils.lerp(this.#longLossLimit, price, this.#sellFraction)
        }
        if (this.#isShorting) {
            this.#shortLossLimit = Utils.lerp(this.#shortLossLimit, price, this.#sellFraction)
        }
    }

    #long(actions) {
        if (this.#shouldLong(this.#emaSeries)) {
            this.#longEntryPrice = this.#currentPrice;
            this.#isLonging = true;
            this.#longLossLimit = this.#currentPrice - this.#maxLossLimit
            actions.push("Long");
        }
    }

    #closeLong(actions) {
        if (this.#shouldCloseLong(this.#ema.current())) {
            this.#justClosedLong = true;
            this.#profitLoss += this.#currentPrice - this.#longEntryPrice;
            this.#isLonging = false;
            actions.push("Close Long");
        }
    }

    #short(actions) {
        if (this.#shouldShort(this.#emaSeries)) {
            this.#shortEntryPrice = this.#currentPrice;
            this.#isShorting = true;
            this.#shortLossLimit = this.#currentPrice + this.#maxLossLimit
            actions.push("Short");
        }
    }

    #closeShort(actions) {
        if (this.#shouldCloseShort(this.#ema.current())) {
            this.#justClosedShort = true;
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

    #shouldLong(series) {
        return Utils.upTrendForLength(series, 3) && !this.#isLonging;
    }

    #shouldShort(series) {
        return Utils.downTrendForLength(series, 3) && !this.#isShorting;
    }

    #shouldCloseLong(price) {
        return this.#isLonging && price <= this.#longLossLimit;
    }

    #shouldCloseShort(price) {
        return this.#isShorting && price >= this.#shortLossLimit;
    }
}

module.exports = AssetTradingEngine;
