import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Divider } from '@mui/material';
import CoinbaseLogo from '../assets/images/coinbase-logo.png'; // Path to your coinbase logo

const TradingHub = () => {
  const [apiKeyName, setApiKeyName] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Here you can process the entered API key and private key
    console.log('API Key Name:', apiKeyName);
    console.log('Private Key:', privateKey);

    // Reset form fields
    setApiKeyName('');
    setPrivateKey('');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4">Trading Hub</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Select a brokerage and enter your API credentials
        </Typography>
      </Box>

      {/* Coinbase Logo and Form */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <img src={CoinbaseLogo} alt="Coinbase" style={{ width: '150px' }} />
      </Box>

      <form onSubmit={handleSubmit}>
        {/* API Key Name Input */}
        <TextField
          label="API Key Name"
          variant="outlined"
          fullWidth
          value={apiKeyName}
          onChange={(e) => setApiKeyName(e.target.value)}
          sx={{ mb: 2 }}
          required
        />

        {/* Private Key Input */}
        <TextField
          label="Private Key"
          variant="outlined"
          fullWidth
          type="password"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          sx={{ mb: 2 }}
          required
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit API Keys
        </Button>
      </form>

      {/* Divider Section */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1">More brokerages coming soon...</Typography>
      </Box>
    </Container>
  );
};

export default TradingHub;
