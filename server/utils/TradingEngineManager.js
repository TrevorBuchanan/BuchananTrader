

const AssetTradingEngine = require("./AssetTradingEngine");

class TradingEngineManager {
    #tradingEngines

    constructor() {
        this.#tradingEngines = {};
    }

    getTradingEngines() {
        return this.#tradingEngines;
    }

    addAssetPrice(assetName, price, time) {
        if (!this.#tradingEngines[assetName]) {
            this.#tradingEngines[assetName] = new AssetTradingEngine(assetName);
        }
        this.#tradingEngines[assetName].addPrice(price, time);
    }

    getAssetProfitLoss(assetName) {
        if (!this.#tradingEngines[assetName]) {
            this.#tradingEngines[assetName] = new AssetTradingEngine(assetName);
        }
        return this.#tradingEngines[assetName].getProfitLoss();
    }

    getAssetAction(assetName) {
        if (!this.#tradingEngines[assetName]) {
            this.#tradingEngines[assetName] = new AssetTradingEngine(assetName);
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
