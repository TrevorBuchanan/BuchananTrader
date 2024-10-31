const TradingEngine = require("./TradingEngine");

class TradingEngineManager {
    #tradingEngines

    constructor() {
        this.#tradingEngines = {};
    }

    addAssetPrice(assetName, price, time) {
        if (!this.#tradingEngines[assetName]) {
            this.#tradingEngines[assetName] = new TradingEngine(assetName);
        }
        this.#tradingEngines[assetName].addPrice(price, time);
    }

    getAssetProfitLoss(assetName) {
        if (!this.#tradingEngines[assetName]) {
            this.#tradingEngines[assetName] = new TradingEngine(assetName);
        }
        return this.#tradingEngines[assetName].getProfitLoss();
    }

    getAssetAction(assetName) {
        if (!this.#tradingEngines[assetName]) {
            this.#tradingEngines[assetName] = new TradingEngine(assetName);
        }
        return this.#tradingEngines[assetName].analyzeSeriesForAction();
    }

    removeAssetTradingEngine(assetName) {
        if (this.#tradingEngines[assetName]) {
            delete this.#tradingEngines[assetName];
            return `Trading engine for ${assetName} removed.`;
        } else {
            throw new Error(`No trading engine for ${assetName}`);
        }
    }
}

module.exports = TradingEngineManager;
