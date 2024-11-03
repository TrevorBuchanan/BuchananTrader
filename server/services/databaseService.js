// databaseService.js

const { pool } = require('../config/database'); 
const bcrypt = require('bcrypt');

// Function to register a new user
const registerUser = async (email, password) => {
    try {
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            throw new Error('User already exists.');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// Function to log in a user
const loginUser = async (email, password) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            throw new Error('Invalid email or password.');
        }
        const user = result.rows[0];

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password.');
        }

        return user; // Return user data if login is successful
    } catch (error) {
        throw error;
    }
};

module.exports = { registerUser, loginUser };
