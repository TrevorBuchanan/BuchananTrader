// database.js
const { Pool } = require('pg');

// Function to create a new database pool based on the environment
const createPool = () => {
    const database = process.env.NODE_ENV === 'test' ? 'buchanantraderdb_test' : 'buchanantraderdb';

    return new Pool({
        user: process.env.DB_USER || 'buchanan',
        host: process.env.DB_HOST || 'localhost',
        database: database,
        password: process.env.DB_PASSWORD || 'Buch514591#',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
    });
};

// Close pool function
const closePool = async (pool) => {
    await pool.end();
    console.log('PostgreSQL pool has ended');
};

// Reset tables function
const resetTables = async (pool) => {
    await pool.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
};

module.exports = { createPool, closePool, resetTables };
