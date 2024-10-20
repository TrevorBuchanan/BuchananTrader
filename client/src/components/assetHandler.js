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
            // Ensure the asset exists in assetList, otherwise initialize it
            if (!this.#assetList[assetName]) {
                this.#assetList[assetName] = { prices: [], profitLosses: [] };
            }

            const response = await axios.get(`/api/coinbase/products/${assetName}`);
            const priceData = response.data;

            const currentDateTime = new Date().toLocaleTimeString();
            const price = parseFloat(priceData.price);
            // Append new price to the asset's price series
            this.#assetList[assetName].prices.push({
                price: price, 
                date: currentDateTime,
            });

            try {
                await axios.post('/api/trading-engine/add-price', {
                    assetName: assetName,
                    price: price,
                    time: currentDateTime
                });
            } catch (err) {
                console.error('Failed to save price to engine:', err.message);
                console.error('Error stack:', err.stack);  
                throw new Error('Failed to save price to engine');
            }
        } catch (err) {
            console.error('Failed to fetch price:', err.message);
            throw new Error('Failed to fetch price');
        }
    };

    // Method to add profit-loss to the series
    addAssetProfitLoss = async (assetName) => {
        try {
            // Ensure the asset exists in assetList, otherwise initialize it
            if (!this.#assetList[assetName]) {
                this.#assetList[assetName] = { prices: [], profitLosses: [] };
            }

            // Fetch profit-loss for the asset
            const response = await axios.get(`/api/trading-engine/profit-loss?assetName=${assetName}`);
            const responseObj = response.data;

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
            // Ensure the asset exists in assetList, otherwise initialize it
            if (!this.#assetList[assetName]) {
                this.#assetList[assetName] = { prices: [], profitLosses: [] };
            }

            // Fetch action for the asset
            const response = await axios.get(`/api/trading-engine/action?assetName=${assetName}`);
            const responseObj = response.data;

            console.log(`Action for ${assetName}:` + responseObj.action);

            // Perform actions

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

    removeAsset = async (assetName) => {
        if (this.#assetList[assetName]) {
            delete this.#assetList[assetName];
        } else {
            console.warn(`Asset "${assetName}" not found.`);
        }
        try {
            // Fetch profit-loss for the asset
            await axios.delete(`/api/trading-engine/remove-asset/${assetName}`);
        } catch (err) {
            console.error(`Failed to deleting ${assetName}`, err.message);
            throw new Error(`Failed to deleting ${assetName}`);
        }
    }
}

export default AssetHandler;