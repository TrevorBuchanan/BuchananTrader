// src/api/index.js

// Import API functions from different files
import { loginUser, registerUser, logoutUser } from './auth';
import {
    getSpotAssets,
    addAssetPriceToEngine,
    getCoinbaseAssetPrice,
    getAssetProfitLoss,
    tradeAsset,
    logAssetPrice,
    fetchAssetLoggedPrices,
    removeAsset,
    getAssetLongLossLimit,
    getAssetShortLossLimit,
    getAssetEMA,
    closeEngineAssetAllPositions,
} from './posts';

export {
    loginUser,
    registerUser,
    logoutUser,
    getSpotAssets,
    addAssetPriceToEngine,
    getCoinbaseAssetPrice,
    getAssetProfitLoss,
    tradeAsset,
    logAssetPrice,
    fetchAssetLoggedPrices,
    removeAsset,
    getAssetLongLossLimit,
    getAssetShortLossLimit,
    getAssetEMA,
    closeEngineAssetAllPositions,
};
