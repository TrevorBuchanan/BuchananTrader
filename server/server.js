const express = require('express');
const loggerMiddleware = require('./middlewares/loggerMiddleware');
const errorHandler = require('./middlewares/errorHandler');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const { Sequelize } = require('sequelize'); // Import Sequelize
require('dotenv').config();
const cors = require('cors');

const app = express();

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DB_NAME || 'buchanantraderdb', 
  process.env.DB_USER || 'trevorbuchanan', 
  process.env.DB_PASSWORD || 'Buch514591#', 
  {
host: process.env.DB_HOST || 'localhost',
dialect: 'postgres',
logging: false,
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(loggerMiddleware); // Logs each request
app.use(errorHandler);

// Use API routes
app.use('/api', apiRoutes);

// Create tables using Sequelize
const initDatabase = async () => {
  try {
      await sequelize.sync(); // Create tables according to the defined models
  } catch (error) {
      console.error('Error creating database and tables:', error);
  }
};

// Start server
const startServer = async () => {
  await initDatabase(); 
  const PORT = process.env.PORT || 6000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer().catch(err => {
  console.error('Error starting the server:', err);
});