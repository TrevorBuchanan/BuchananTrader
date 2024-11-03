// databaseController.js
const databaseService = require('../services/databaseService');

const registerUser = async (req, res) => {
    try {
        const userData = req.body; 
        const newUser = await databaseService.createUser(userData);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    registerUser,
};