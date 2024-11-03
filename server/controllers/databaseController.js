// databaseController.js

const databaseService = require('../services/databaseService');
const { makeJWT } = require('../utils/JWTgenerator');

// Controller for user registration
const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const newUser = await databaseService.registerUser(email, password);
        res.status(201).json({ id: newUser.id, email: newUser.email, created_at: newUser.created_at });
    } catch (error) {
        if (error.message === 'User already exists.') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller for user login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await databaseService.loginUser(email, password);
        
        // Generate JWT
        const token = makeJWT(user.id, process.env.EC_PRIVATE_KEY, `/user/${user.id}`);
        
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        if (error.message === 'Invalid email or password.') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { registerUser, loginUser };
