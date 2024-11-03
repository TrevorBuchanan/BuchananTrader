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

module.exports = { registerUser };
