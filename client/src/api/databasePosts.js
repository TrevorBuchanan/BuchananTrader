import axios from "axios";

// ?
// const logAssetPrice = async (assetName, price, time) => {
//     try {
//         await axios.post('/api/log-price', {
//             assetName,
//             price,
//             time,
//         });
//     } catch (err) {
//         console.error('Failed to log asset price:', err.message);
//         throw new Error('Failed to log asset price');
//     }
// }; 


// ?
// const fetchAssetLoggedPrices = async (assetName) => {
//     try {
//         const response = await axios.get(`/api/fetch-prices?assetName=${assetName}`);
//         // const responseObj = response.data;
//         return response.data;
//     } catch (err) {
//         console.error('Failed to fetch logged prices:', err.message);
//         throw new Error('Failed to fetch logged prices');
//     }
// }

const setUserApiKeys = async (userId, newApiKey, newPrivateKey) => {
    try {
        const body = {
            userId,
            newApiKey,
            newPrivateKey
        };
        const response = await axios.post('/api/set-user-keys', body);
        return response.data;
    } catch (err) {
        throw new Error('Failed to set user keys');
    }
};

// src/api/index.js

const fetchUserDetails = async (token) => {
    const response = await fetch('/api/user', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user details');
    }

    const data = await response.json();
    return data; // { id, email, ... }
};

export {
    setUserApiKeys,
    fetchUserDetails,
}