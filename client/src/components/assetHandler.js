import axios from 'axios';

// Singleton
class AssetHandler {
    constructor() {
        if (AssetHandler.instance) {
            return AssetHandler.instance;
        }

        this.assetList = {};

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

    // Placeholder method for a test buyer
    useTestBuyer() {
        // Define the logic for test buyer if needed
    }

    // Placeholder method for a Coinbase buyer
    useCoinbaseBuyer() {
        // Define the logic for Coinbase buyer if needed
    }

    // Method to add Coinbase prices to an asset's price series
    addCoinbasePrice = async (assetName) => {
        try {
            // Ensure the asset exists in assetList, otherwise initialize it
            if (!this.assetList[assetName]) {
                this.assetList[assetName] = { prices: [], profitLosses: [], updateFreq: 0 };
            }

            const response = await axios.get(`/api/coinbase/products/${assetName}`);
            const priceData = response.data;

            // Append new price to the asset's price series
            this.assetList[assetName].prices.push({
                price: parseFloat(priceData.price), // Ensure price is a number
                date: new Date().toLocaleTimeString(),
            });

        } catch (err) {
            console.error('Failed to fetch prices:', err.message);
            throw new Error('Failed to fetch prices');
        }
    };

    // Method to add profit-loss to the series
    addProfitLoss = async (assetName) => {
        try {
            // Ensure the asset exists in assetList, otherwise initialize it
            if (!this.assetList[assetName]) {
                this.assetList[assetName] = { prices: [], profitLosses: [], updateFreq: 0 };
            }

            const response = await axios.get(`/api/trading-engine/profit-loss`);
            const responseObj = response.data;

            // Append new profit-loss to the asset's profit-loss series
            this.assetList[assetName].profitLosses.push({
                profitLoss: parseFloat(responseObj.profitLoss), // Ensure profit-loss is a number
                date: new Date().toLocaleTimeString(),
            });

        } catch (err) {
            console.error('Failed to fetch profit-loss:', err.message);
            throw new Error('Failed to fetch profit-loss');
        }
    };

    getAssetList() {
        return this.assetList;
    }

    getAsset(assetName) {
        if (this.assetList[assetName]) {
            return this.assetList[assetName];
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

    removeAsset(assetName) {
        if (this.assetList[assetName]) {
            delete this.assetList[assetName];
            console.log(`Asset "${assetName}" removed successfully.`);
        } else {
            console.warn(`Asset "${assetName}" not found.`);
        }
    }
} 

export default AssetHandler;
