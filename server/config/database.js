// database.js
const { Pool } = require('pg');

// Create a new database pool based on the environment
const pool = new Pool({
    user: process.env.DB_USER || 'trevorbuchanan',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.NODE_ENV === 'test' ? 'buchanantraderdb_test' : 'buchanantraderdb',
    password: process.env.DB_PASSWORD || 'Buch514591#',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
});

// Close pool function
const closePool = async () => {
    await pool.end();
};

// Reset tables function
const resetTables = async () => {
    await pool.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
};

// Export the pool and utility functions
module.exports = { pool, closePool, resetTables };