// src/api/index.js

// Import API functions from different files
import { 
    loginUser, 
    registerUser, 
    logoutUser 
} from './authPosts';

import {
} from './enginePosts';

import {
    getCoinbaseAssetsList,
    getCoinbaseAssetInfo,
    getCoinbaseAssetPriceHistory
} from './coinbasePosts';

import {
    setUserApiKeys,
    fetchUserDetails,
} from './databasePosts';

export {
    // Auth
    loginUser,
    registerUser,
    logoutUser,

    // Engine


    // Coinbase
    getCoinbaseAssetsList,
    getCoinbaseAssetInfo,
    getCoinbaseAssetPriceHistory,

    // Database
    setUserApiKeys,
    fetchUserDetails,
};
