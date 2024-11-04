// databaseService.js

const User = require('../models/User'); 

const createUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (err) {
        throw err;
    }
};

// Find user by email
const findUserByEmail = async (email) => {
    try {
        return await User.findOne({ where: { email } });
    } catch (err) {
        console.log(err)
        throw err;
    }
};

// Authenticate user credentials
const authenticateUser = async (email, password) => {
    try {
        const user = await findUserByEmail(email);
        console.log(user);
        if (!user) return null;

        // Check if password matches
        const isMatch = await user.comparePassword(password);
        return isMatch ? user : null;
    } catch (err) {
        console.log(err)
        throw err;
    }
};

module.exports = {
    createUser,
    findUserByEmail,
    authenticateUser,
};