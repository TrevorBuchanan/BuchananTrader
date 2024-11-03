// databaseController.js

const databaseService = require('../services/databaseService');

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = await databaseService.createUser(username, password);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await databaseService.getUserById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Login user function
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await databaseService.loginUser(username, password);
        if (user) {
            res.json(user); // Return the user information on successful login
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getUser, registerUser, loginUser };
