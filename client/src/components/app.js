// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme, Box } from '@mui/material';
import Header from './layout/header';
import Footer from './layout/footer';
import NotFound from './layout/notFound';
import TradingHub from './tradingHub';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#407E3D',
    },
    secondary: {
      main: '#885b3f',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Header />
          <Box component="main" flexGrow={1} p={3}>
            <Routes>
              <Route path="/trading-hub" element={<TradingHub />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;