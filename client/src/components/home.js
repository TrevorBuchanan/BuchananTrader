// home.js

import React from 'react';
import { Box, Grid2, Paper, Typography, Button } from '@mui/material';

function Home() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        Welcome to BuchananTrader
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5">Feature 1</Typography>
            <Typography>Explore our awesome features.</Typography>
            <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
              Learn More
            </Button>
          </Paper>
        </Grid2>
        <Grid2 item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5">Feature 2</Typography>
            <Typography>Track your progress easily.</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Get Started
            </Button>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Home;


// function Home() {
//     return (
//         <>
//             <div className="gradient"></div>
//             <h1>Home</h1>

//             <h2>Home/page details</h2>
//             <li>Stuff...</li>
            
//             <h2>Trading Section</h2>

//             <h3>Coinbase Trading</h3>
//             <li>Spot Asset List</li>
//             <li>Futures Asset List</li>

//             <h3>Other types of trading</h3>
//             <li>Tradovate ect.</li>

            
//             <h2>Trading Hub</h2>
//             <h3>Series -es</h3>
//             <li>Get history</li>
//             <li>Log current</li>
//             <li>Download series information from log</li>


//             <h2>Personal</h2>
//             <li> Overall statistics (Profit loss etc.) </li>
//             <li> Account information </li>
//             <li> Login/logout </li>
            
//         </>
//     );
// }

// export default Home;