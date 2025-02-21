
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
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const TradingHub = () => {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [apiKeyName, setApiKeyName] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [assetType, setAssetType] = useState('Spot');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('');

  const assets = [
    'BTC/USD',
    'ETH/USD',
    'LTC/USD',
    'ADA/USD',
    'XRP/USD',
    'DOGE/USD',
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const handleSubmit = () => {
    console.log('API Key Name:', apiKeyName);
    console.log('Private Key:', privateKey);
    console.log('Selected Asset:', selectedAsset);
    console.log('Asset Type:', assetType);
    handleClose();
  };

  const filteredAssets = assets.filter((asset) =>
    asset.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Trading Hub
      </Typography>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Connect to Coinbase
        </Button>
        <Button variant="outlined" color="primary" onClick={handleDrawerOpen}>
          Select Asset
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Connect to Coinbase</DialogTitle>
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

      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <Box width={300} p={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Select Asset</Typography>
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box display="flex" justifyContent="space-around" mb={2}>
            <Button
              variant={assetType === 'Spot' ? 'contained' : 'outlined'}
              onClick={() => setAssetType('Spot')}
            >
              Spot
            </Button>
            <Button
              variant={assetType === 'Futures' ? 'contained' : 'outlined'}
              onClick={() => setAssetType('Futures')}
            >
              Futures
            </Button>
            <Button
              variant={assetType === 'Perps' ? 'contained' : 'outlined'}
              onClick={() => setAssetType('Perps')}
            >
              Perps
            </Button>
          </Box>
          <Divider sx={{ my: 2 }} />
          <TextField
            label="Search Assets"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <List subheader={<ListSubheader>Assets</ListSubheader>} sx={{ mt: 2, maxHeight: 300, overflowY: 'auto' }}>
            {filteredAssets.map((asset) => (
              <ListItem
                button
                key={asset}
                selected={selectedAsset === asset}
                onClick={() => {
                  setSelectedAsset(asset);
                  handleDrawerClose();
                }}
              >
                <ListItemText primary={asset} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Divider sx={{ my: 3 }} />

      <Box
        sx={{
          minHeight: 600,
          mx: 'auto',
          my: 4,
          px: 3,
          py: 4,
          backgroundColor: 'background.paper',
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Box>
          No asset selected

          otherwise price is shown
        </Box>
      </Box>
    </Box>
  );
};

export default TradingHub;
