// database.js

const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

// Create a new Sequelize instance using environment variables
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Ensure you specify the port if needed
    dialect: 'postgres', // Specify the dialect (PostgreSQL in this case)
    logging: false, // Disable logging; set to console.log to see SQL queries
});

// Test the database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        throw new Error('Unable to connect to the database:', error);
    }
};

// Export the sequelize instance and testConnection function
module.exports = {
    sequelize,
    testConnection,
};