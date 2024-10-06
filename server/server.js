const express = require('express');
const cors = require('cors'); 
const path = require('path');
const app = express();
const apiRoutes = require('./routes/apiRoutes');

require('dotenv').config();

const apiKey = process.env.COINBASE_API_KEY;
const privateKey = process.env.COINBASE_PRIVATE_KEY;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

// API Routes
app.use('/routes', apiRoutes);

// Set up the EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// Set up the EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route for rendering EJS views
app.get('/', (req, res) => {
  res.render('home', { title: 'Home'})
})

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login Page' });
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'Register Page' });
});

app.get('/user-profile', (req, res) => {
  res.render('userProfile', { title: 'User Profile' });
});

app.get('/admin-profile', (req, res) => {
  res.render('adminProfile', { title: 'Admin Profile' });
});

app.get('/user-hub', (req, res) => {
  res.render('userHub', { title: 'User Trading Hub' });
});

app.get('/admin-hub', (req, res) => {
  res.render('adminHub', { title: 'Admin Trading Hub' });
});

// Start the server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
