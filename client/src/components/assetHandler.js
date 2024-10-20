import axios from 'axios';

// Singleton
class AssetHandler {
    #assetList

    constructor() {
        if (AssetHandler.instance) {
            return AssetHandler.instance;
        }

        this.#assetList = {};

        AssetHandler.instance = this;

        Object.freeze(AssetHandler.instance);
    }

    // Static method to get the singleton instance
    static getInstance() {
        if (!AssetHandler.instance) {
            AssetHandler.instance = new AssetHandler();
        }
        return AssetHandler.instance;
    }

    // Method to add Coinbase prices to an asset's price series
    addCoinbaseAssetPrice = async (assetName) => {
        try {
            // Ensure the asset exists in assetList
            if (!this.#assetList[assetName]) {
                throw new Error(`Asset ${assetName} does not exist`)
            }

            const response = await axios.get(`/api/coinbase/products/${assetName}`);
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

    // Method to add profit-loss to the series
    addAssetProfitLoss = async (assetName) => {
        try {
            // Ensure the asset exists in assetList
            if (!this.#assetList[assetName]) {
                throw new Error(`Asset ${assetName} does not exist`)
            }

            // Fetch profit-loss for the asset
            const response = await axios.get(`/api/trading-engine/profit-loss?assetName=${assetName}`);
            const responseObj = response.data;
            console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            console.log(responseObj);

            // Append new profit-loss to the asset's profit-loss series
            this.#assetList[assetName].profitLosses.push({
                profitLoss: parseFloat(responseObj.profitLoss), // Ensure profit-loss is a number
                date: new Date().toLocaleTimeString(),
            });

        } catch (err) {
            console.error('Failed to fetch profit-loss:', err.message);
            throw new Error('Failed to fetch profit-loss');
        }
    };

    // Method to trade an asset
    tradeAsset = async (assetName) => {
        try {
            // Ensure the asset exists in assetList
            if (!this.#assetList[assetName]) {
                throw new Error(`Asset ${assetName} does not exist`)
            }

            // Fetch action for the asset
            const response = await axios.post(`/api/trading-engine/action`, { assetName });
            const responseObj = response.data;

            console.log(`Action for ${assetName}:`, responseObj.action);

            // Here, you can append the action to a corresponding list if needed
            // this.#assetList[assetName].actions.push(responseObj.action);

        } catch (err) {
            console.error('Failed to fetch trading action:', err.message);
            throw new Error('Failed to fetch trading action');
        }
    };

    getAssetList() {
        return this.#assetList;
    }

    getAsset(assetName) {
        if (this.#assetList[assetName]) {
            return this.#assetList[assetName];
        } else {
            console.warn(`Asset "${assetName}" not found.`);
            return null;
        }
    }

    // Get the price series for a specific asset
    getAssetPriceSeries(assetName) {
        const asset = this.getAsset(assetName);
        if (asset) {
            return asset.prices;
        } else {
            return [];
        }
    }

    // Get the profit-loss series for a specific asset
    getAssetProfitLossSeries(assetName) {
        const asset = this.getAsset(assetName);
        if (asset) {
            return asset.profitLosses;
        } else {
            return [];
        }
    }

    addAsset(assetName) {
        if (!this.#assetList[assetName]) {
            console.log(`Asset ${assetName} added`);
            this.#assetList[assetName] = { prices: [], profitLosses: [], tradingEngine };

        } else {
            console.log(`Asset ${assetName} already exists`);
        }
    }

    removeAsset(assetName) {
        if (this.#assetList[assetName]) {
            delete this.#assetList[assetName];
            console.log(`Asset "${assetName}" removed successfully.`);
        } else {
            console.warn(`Asset "${assetName}" not found.`);
        }
    }
}

export default AssetHandler;