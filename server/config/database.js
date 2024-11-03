// database.js

const { Pool } = require('pg');

const pool = new Pool({
    user: 'buchanan',
    host: 'localhost',
    database: 'buchanantraderdb',
    password: 'Buch514591#',
    port: 5432,
});

// Function to close the pool when the application exits
const closePool = async () => {
    await pool.end();
    console.log('PostgreSQL pool has ended');
};

// Handle uncaught exceptions
process.on('exit', closePool);
process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err);
    closePool();
    process.exit(1);
});
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
    closePool();
    process.exit(1);
});

module.exports = { pool };
