import AssetHandler from "./assetHandler";
import axios from 'axios';

class TradingEngineHandler {
    constructor() {
        if (TradingEngineHandler.instance) {
            return TradingEngineHandler.instance;
        }

        TradingEngineHandler.instance = this;

        Object.freeze(TradingEngineHandler.instance);
    }

    getTradingAction = async (assetName) => {
        try {
            const response = await axios.get(`/api/trading-engine/${assetName}`);
            const priceData = response.data;

            // Append new price to the asset's price series
            this.#assetList[assetName].prices.push({
                price: parseFloat(priceData.price), // Ensure price is a number
                date: new Date().toLocaleTimeString(),
            });

        } catch (err) {
            console.error('Failed to fetch prices:', err.message);
            throw new Error('Failed to fetch prices');
        }
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