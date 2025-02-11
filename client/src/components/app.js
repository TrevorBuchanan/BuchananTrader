// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme, Box } from '@mui/material';
import Header from './header';
import Footer from './footer';
import Home from './home';
import Login from './login';
import Register from './register';
import NotFound from './notFound';
import PrivateRoute from './privateRoute';
import UserProfile from './userProfile';
import TradingHub from './tradingHub';
import { AuthProvider } from '../context/authContext';

const theme = createTheme({
  palette: {
    mode: 'dark', // Use 'light' for light mode
    primary: {
      main: '#407E3D', 
    },
    secondary: {
      main: '#7c4e31',
    },
  },
});

function App() {
    return (
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Box display="flex" flexDirection="column" minHeight="100vh">
              <Header />
              <Box component="main" flexGrow={1} p={3}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route element={<PrivateRoute />}>
                    <Route path="/user-profile" element={<UserProfile />} />
                    <Route path="/trading-hub" element={<TradingHub />} />
                  </Route>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    );
  }
  
  export default App;