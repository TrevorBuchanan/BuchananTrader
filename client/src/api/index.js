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
    removeAsset,
    getAssetLongLossLimit,
    getAssetShortLossLimit,
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
    removeAsset,
    getAssetLongLossLimit,
    getAssetShortLossLimit,
};
