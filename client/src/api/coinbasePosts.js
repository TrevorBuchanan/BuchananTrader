import axios from "axios";

const getCoinbaseAssetsList = async () => {
    try {
        const response = await fetch('/api/coinbase/assets-list');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching assets list:', error);
    }
};

const getCoinbaseAssetInfo = async (assetName) => {
    try {
        const response = await axios.get(`/api/coinbase/asset-info/${assetName}`);
        return response.data;  // Return the fetched data
    } catch (err) {
        console.error('Failed to fetch price: ', err.message);
        throw new Error('Failed to fetch price');
    }
};

const getCoinbaseAssetPriceHistory = async (assetName, start, end, granularity) => {
    try {
        const response = await axios.get(`/api/coinbase/asset-history/${assetName}`);
        return response.data;
    } catch (err) {
        console.error('Failed to fetch asset price history: ', err.message);
        throw new Error('Failed to fetch asset price history');
    }
}

export {
    getCoinbaseAssetsList,
    getCoinbaseAssetInfo,
    getCoinbaseAssetPriceHistory
}