// header.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { user, logout } = useAuth(); // Get user and logout function from context
  const navigate = useNavigate(); // Used for navigation

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home after logout
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          BuchananTrader
        </Typography>
        <Box>
          <Button color="inherit" href="/">Home</Button>

          {/* Conditionally render login/register buttons if user is not logged in */}
          {!user ? (
            <>
              <Button color="inherit" href="/login">Login</Button>
              <Button color="inherit" href="/register">Register</Button>
            </>
          ) : (
            <>
              {/* Render navigation links for logged-in users */}
              <Button color="inherit" href="/trading-hub">Trading Hub</Button>
              <Button color="inherit" href="/user-profile">User Profile</Button>

              {/* Render logout button if user is logged in */}
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
