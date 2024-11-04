// server.js

const express = require('express');
const loggerMiddleware = require('./middlewares/loggerMiddleware');
const errorHandler = require('./middlewares/errorHandler');
const { sequelize, testConnection } = require('./config/database');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(loggerMiddleware); // Logs each request
app.use(errorHandler); // Error handling middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files if needed

// Routes
app.use('/api', apiRoutes); // Use your defined API routes

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

// Start the Server
const startServer = async () => {
    await testConnection(); // Test the database connection
    await sequelize.sync();
    const PORT = process.env.PORT || 6000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

// Start the server
startServer().catch(err => {
    console.error('Error starting the server:', err);
});