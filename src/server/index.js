const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (the React app build)
app.use(express.static(path.join(__dirname, '../build')));

// Handle routes for your server-side rendered EJS templates
app.get('/', (req, res) => {
  res.render('index', { title: 'Buchanan Stock Trader' });
});

// For any React routing, fallback to serving index.html from React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
