// database.js

const { Sequelize } = require('sequelize');
require('dotenv').config(); 

// Create a new Sequelize instance using environment variables
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    dialect: 'postgres', 
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

module.exports = {
    sequelize,
    testConnection,
};