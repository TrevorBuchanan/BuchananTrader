// authRoutes.js

const express = require('express');
const databaseController = require('../controllers/databaseController'); // Import the controller

const router = express.Router();

// Register Route
router.post('/register', databaseController.registerUser);

// Login Route
router.post('/login', databaseController.loginUser);

module.exports = router;
