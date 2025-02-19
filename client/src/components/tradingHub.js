import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';

const TradingHub = () => {
  const [open, setOpen] = useState(false);
  const [apiKeyName, setApiKeyName] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    console.log('API Key Name:', apiKeyName);
    console.log('Private Key:', privateKey);
    // Add your API connection logic here
    handleClose();
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Trading Hub
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Connect Brokerage
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Connect Brokerage</DialogTitle>
        <DialogContent>
          <Box component="form" display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="API Key Name"
              fullWidth
              value={apiKeyName}
              onChange={(e) => setApiKeyName(e.target.value)}
              variant="outlined"
            />
            <TextField
              label="Private Key"
              type="password"
              fullWidth
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TradingHub;
