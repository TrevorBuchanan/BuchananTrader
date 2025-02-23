// header.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate(); // Used for navigation
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          BuchananTrader
        </Typography>
        <Box>
          <Button color="inherit" href="/trading-hub">Trading Hub</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
