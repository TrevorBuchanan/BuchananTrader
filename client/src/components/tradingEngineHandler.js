import TradingEngine from "../../../server/utils/TradingEngine";
import AssetHandler from "./assetHandler";
import axios from 'axios';

class TradingEngineHandler {
    #tradingEngines
    constructor() {
        if (TradingEngineHandler.instance) {
            return TradingEngineHandler.instance;
        }

        TradingEngineHandler.instance = this;

        this.#tradingEngines = {}

        Object.freeze(TradingEngineHandler.instance);
    }

    addTradingEngine(assetName) {
        if  (!this.tradingEngines[assetName]) {
        this.#tradingEngines[assetName] = new TradingEngine();
        }
    }

    getTradingAction(assetName) {
        this.#tradingEngines[assetName]
    };

    #MockTradingEngine() {

    }

    startMockTradingEngine() {
        
    }

    stopMockTradingEngine() {
        
    }

    #CoinbaseTradingEngine() {

    }

    startCoinbaseTradingEngine() {
        
    }

    stopCoinbaseTradingEngine() {
        
    }
}

export default TradingEngineHandler;