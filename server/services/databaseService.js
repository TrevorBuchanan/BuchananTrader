// databaseService.js

const { pool } = require('../config/database'); 
const bcrypt = require('bcrypt');

const getUserById = async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
};

const createUser = async (username, password) => {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [username, hashedPassword] // Store the hashed password
    );
    return result.rows[0];
};

// Function to log in a user
const loginUser = async (username, password) => {
    // Get the user by username
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    // If user not found, return null
    if (!user) {
        return null;
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        return user; // Passwords match, return the user
    } else {
        return null; // Passwords do not match
    }
};

module.exports = { getUserById, createUser, loginUser };
