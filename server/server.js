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

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Sample data
const sampleData = [
  {
    "timestamp": "2024-01-01",
    "series": [
      { "name": "Bitcoin", "price": 332 },
      { "name": "Buchanan", "price": 100 },
      { "name": "Ethereum", "price": 25 }
    ]
  },
  {
    "timestamp": "2024-01-02",
    "series": [
      { "name": "Bitcoin", "price": 433 },
      { "name": "Buchanan", "price": 290 },
      { "name": "Ethereum", "price": 91 }
    ]
  },
  {
    "timestamp": "2024-01-03",
    "series": [
      { "name": "Bitcoin", "price": 522 },
      { "name": "Buchanan", "price": null },
      { "name": "Ethereum", "price": 198 }
    ]
  },
  {
    "timestamp": "2024-01-04",
    "series": [
      { "name": "Bitcoin", "price": 320 },
      { "name": "Buchanan", "price": null },
      { "name": "Ethereum", "price": 190 }
    ]
  },
  {
    "timestamp": "2024-01-05",
    "series": [
      { "name": "Bitcoin", "price": 230 },
      { "name": "Buchanan", "price": null },
      { "name": "Ethereum", "price": 200 }
    ]
  },
  {
    "timestamp": "2024-01-06",
    "series": [
      { "name": "Bitcoin", "price": 135 },
      { "name": "Buchanan", "price": 400 },
      { "name": "Ethereum", "price": 311 }
    ]
  },
  {
    "timestamp": "2024-01-07",
    "series": [
      { "name": "Bitcoin", "price": 250 },
      { "name": "Buchanan", "price": 340 },
      { "name": "Ethereum", "price": 510 }
    ]
  },
];

// API endpoint to get price data
app.get('/api/graph-data', (req, res) => {
  res.json(sampleData);
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// Start the server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
