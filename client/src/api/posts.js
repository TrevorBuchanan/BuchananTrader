// src/api/posts.js
import axios from "axios";

const addAssetPriceToEngine = async (assetName, price, time) => {
    try {
        const response = await axios.post('/api/trading-engine/add-price', {
            assetName,
            price,
            time,
        });
        return response.data;  // Return the response data (if needed)
    } catch (err) {
        console.error('Failed to save price to engine:', err.message);
        throw new Error('Failed to save price to engine');
    }
};

const getCoinbaseAssetPrice = async (assetName) => {
    try {
        const response = await axios.get(`/api/coinbase/products/${assetName}`);
        return response.data;  // Return the fetched data
    } catch (err) {
        console.error('Failed to fetch price:', err.message);
        throw new Error('Failed to fetch price');
    }
};

const getAssetProfitLoss = async (assetName) => {
    try {
        const response = await axios.get(`/api/trading-engine/profit-loss?assetName=${assetName}`);
        return response.data;  // You might want to return the profit/loss data
    } catch (err) {
        console.error('Failed to fetch profit-loss:', err.message);
        throw new Error('Failed to fetch profit-loss');
    }
};

const tradeAsset = async (assetName) => {
    try {
        const response = await axios.get(`/api/trading-engine/action?assetName=${assetName}`);
        const responseObj = response.data;
        console.log(`Action for ${assetName}:` + responseObj.action);
        return responseObj;  // You may return the action response
    } catch (err) {
        console.error('Failed to fetch trading action:', err.message);
        throw new Error('Failed to fetch trading action');
    }
};

const logAssetPrice = async (assetName, price, time) => {
    try {
        await axios.post('/api/log-price', {
            assetName,
            price,
            time,
        });
    } catch (err) {
        console.error('Failed to log asset price:', err.message);
        throw new Error('Failed to log asset price');
    }
}

const removeAsset = async (assetName) => {
    try {
        await axios.delete(`/api/trading-engine/remove-asset/${assetName}`);
        console.log(`Successfully deleted asset: ${assetName}`);
    } catch (err) {
        console.error(`Failed to delete ${assetName} from server:`, err.message);
        throw new Error(`Failed to delete ${assetName} from server`);
    }
};

const getSpotAssets = async () => {
    try {
        const response = await fetch('/api/coinbase/products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching spot products:', error);
    }
}

export {
    getSpotAssets,
    addAssetPriceToEngine,
    getCoinbaseAssetPrice,
    getAssetProfitLoss,
    tradeAsset,
    logAssetPrice,
    removeAsset,
};
