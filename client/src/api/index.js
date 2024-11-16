// src/api/index.js

// Import API functions from different files
import { loginUser, registerUser, logoutUser } from './auth';
import {
    addAssetPrice,
    getCoinbaseAssetPrice,
    addAssetProfitLoss,
    tradeAsset,
    removeAsset
} from './posts';

export {
    loginUser,
    registerUser,
    logoutUser,
    addAssetPrice,
    getCoinbaseAssetPrice,
    addAssetProfitLoss,
    tradeAsset,
    removeAsset,
};
