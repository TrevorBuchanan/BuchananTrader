import axios from "axios";

//
// TODO: Calculate some sort of index of how likely an asset price is going to 
// move in the same direction as previously for some given time-step
//

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

const getAssetProfitLoss = async (assetName) => {
    try {
        const response = await axios.get(`/api/trading-engine/profit-loss?assetName=${assetName}`);
        return response.data;
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

const removeAsset = async (assetName) => {
    try {
        await axios.delete(`/api/trading-engine/remove-asset/${assetName}`);
        console.log(`Successfully deleted asset: ${assetName}`);
    } catch (err) {
        console.error(`Failed to delete ${assetName} from server:`, err.message);
        throw new Error(`Failed to delete ${assetName} from server`);
    }
};

const getAssetLongLossLimit = async (assetName) => {
    try {
        const response = await axios.get(`/api/trading-engine/long-loss-limit?assetName=${assetName}`);
        return response.data;
    } catch (err) {
        console.error('Failed to fetch long loss limit:', err.message);
        throw new Error('Failed to fetch long loss limit');
    }
};

const closeEngineAssetAllPositions = async (assetName) => {
    try {
        const response = await axios.post('/api/trading-engine/close-positions', {
            assetName,
        });
        return response.data;
    } catch (err) {
        console.error('Failed to close positions in engine:', err.message);
        throw new Error('Failed to close positions in engine');
    }
};

const getAssetShortLossLimit = async (assetName) => {
    try {
        const response = await axios.get(`/api/trading-engine/short-loss-limit?assetName=${assetName}`);
        return response.data;
    } catch (err) {
        console.error('Failed to fetch short loss limit:', err.message);
        throw new Error('Failed to fetch short loss limit');
    }
};

const getAssetEMA = async (assetName) => {
    try {
        const response = await axios.get(`/api/trading-engine/ema?assetName=${assetName}`);
        return response.data;
    } catch (err) {
        console.error('Failed to fetch EMA:', err.message);
        throw new Error('Failed to fetch EMA');
    }
};

export {
    
}
