// AssetTradingEngine.js
const Utils = require('./utilFunctions');
const EMA = require('./EMA');

class AssetTradingEngine {
    #minSeriesLen
    #lerpFraction
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

    #lerpValue
    #lerpSeries

    constructor(assetName) {
        this.#minSeriesLen = 3;
        this.#sellFraction = 0.4;
        this.#lerpFraction = 0.3;
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

        this.#emaWindowSize = 5;
        this.#ema = new EMA(this.#emaWindowSize);
        this.#emaSeries = [];

        this.#lerpValue = 0;
        this.#lerpSeries = [];
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

    getEMA() {
        return this.#ema.current();
    }

    addPrice(price, time) {
        this.#currentPrice = price;
        this.#priceSeries.push({'price': price, 'time': time});
        this.#emaSeries.push({'price': this.#ema.update(price), 'time': time});
        if (this.#lerpSeries.length === 0) {
            this.#lerpValue = price;
        } else {
            this.#lerpValue = Utils.lerp(this.#lerpValue, price, this.#lerpFraction);
        }
        this.#lerpSeries.push(this.#lerpValue);
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

        const apply_price = this.#ema.current();
        const apply_series = this.#emaSeries;

        // Loss limit updates
        this.#updateLimits(apply_price)

        // Enter logic: Should we enter a long or short position?
        this.#long(apply_series, apply_price, actions)
        this.#short(apply_series, apply_price, actions)

        // Exit logic: Should we close a long or short position?
        this.#closeLong(apply_price, actions)
        this.#closeShort(apply_price, actions)

        // Hold if no other actions
        this.#hold(actions)

        return actions;
    }

    #updateLimits(price) {
        if (this.#isLonging) {
            this.#longLossLimit = Utils.lerp(this.#longLossLimit, price, this.#sellFraction)
        }
        if (this.#isShorting) {
            this.#shortLossLimit = Utils.lerp(this.#shortLossLimit, price, this.#sellFraction)
        }
    }

    #long(series, price, actions) {
        if (this.#shouldLong(series)) {
            this.#longEntryPrice = this.#currentPrice;
            this.#isLonging = true;
            this.#longLossLimit = price - this.#maxLossLimit
            actions.push("Long");
        }
    }

    #closeLong(price, actions) {
        if (this.#shouldCloseLong(price)) {
            this.#justClosedLong = true;
            this.#profitLoss += this.#currentPrice - this.#longEntryPrice;
            this.#isLonging = false;
            actions.push("Close Long");
        }
    }

    #short(series, price, actions) {
        if (this.#shouldShort(series)) {
            this.#shortEntryPrice = this.#currentPrice;
            this.#isShorting = true;
            this.#shortLossLimit = price + this.#maxLossLimit
            actions.push("Short");
        }
    }

    #closeShort(price, actions) {
        if (this.#shouldCloseShort(price)) {
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
        return Utils.upTrendForLength(series, 3) && !this.#isLonging &&
            Utils.upTrendForLength(this.#priceSeries, 3);
    }

    #shouldShort(series) {
        return Utils.downTrendForLength(series, 3) && !this.#isShorting &&
            Utils.downTrendForLength(this.#priceSeries, 3);
    }

    #shouldCloseLong(price) {
        return this.#isLonging && price <= this.#longLossLimit;
    }

    #shouldCloseShort(price) {
        return this.#isShorting && price >= this.#shortLossLimit;
    }
}

module.exports = AssetTradingEngine;
