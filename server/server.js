const express = require('express');
const loggerMiddleware = require('./middlewares/loggerMiddleware');
const errorHandler = require('./middlewares/errorHandler');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');

const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(loggerMiddleware); // Logs each request
app.use(errorHandler); 

// Use API routes
app.use('/api', apiRoutes);

// Start the server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Close the pool on exit
process.on('exit', () => {
  pool.end(() => {
    console.log('Pool has ended');
  });
});

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  pool.end(() => {
    console.log('Pool has ended due to an uncaught exception');
    process.exit(1); // Exit the process with failure
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  pool.end(() => {
    console.log('Pool has ended due to an unhandled rejection');
    process.exit(1); // Exit the process with failure
  });
});
