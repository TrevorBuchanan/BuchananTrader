// databaseController.js

const databaseService = require('../services/databaseService');

// Controller for user registration
const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const newUser = await databaseService.registerUser(email, password);
        res.status(201).json({ id: newUser.id, email: newUser.email, created_at: newUser.created_at });
    } catch (error) {
        console.error('Error registering user:', error.message);
        if (error.message === 'User already exists.') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { registerUser };
