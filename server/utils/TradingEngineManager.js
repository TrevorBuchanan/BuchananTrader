const TradingEngine = require("./TradingEngine");

class TradingEngineManager {
    #tradingEngines

    constructor() {
        this.#tradingEngines = {};
    }

    addAssetPrice(assetName, price) {
        if (this.#tradingEngines[assetName]) {
            this.#tradingEngines[assetName].addPrice(price);
            return this.#tradingEngines[assetName].analyzeSeriesForAction();
        } else {
            return `No trading engine for ${assetName}`;
        }
    }

    getAssetProfitLoss(assetName) {
        if (this.#tradingEngines[assetName]) {
            return this.#tradingEngines[assetName].getProfitLoss();
        } else {
            return `No trading engine for ${assetName}`;
        }
    }

    getAssetAction(assetName) {
        if (this.#tradingEngines[assetName]) {
            return this.#tradingEngines[assetName].analyzeSeriesForAction();
        } else {
            return `No trading engine for ${assetName}`;
        }
    }

    addAssetTradingEngine(assetName) {
        if (!this.#tradingEngines[assetName]) {
            this.#tradingEngines[assetName] = new TradingEngine(assetName);
        } else {
            return `Trading engine for ${assetName} already exists.`;
        }
    }

    removeAssetTradingEngine(assetName) {
        if (this.#tradingEngines[assetName]) {
            delete this.#tradingEngines[assetName];
            return `Trading engine for ${assetName} removed.`;
        } else {
            return `No trading engine for ${assetName}`;
        }
    }
}

module.exports = TradingEngineManager;
