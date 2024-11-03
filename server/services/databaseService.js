const User = require('../models/User'); 

const createUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createUser,
};