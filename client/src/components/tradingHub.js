import React, { useState, useEffect } from 'react';
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
    IconButton,
    Divider,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getSpotAssets } from '../api';

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

const TradingHub = () => {
    const [open, setOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [apiKeyName, setApiKeyName] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [assetType, setAssetType] = useState('Spot');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAsset, setSelectedAsset] = useState('');
    const [assets, setAssets] = useState([]);
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch assets
    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const data = await getSpotAssets();
                const dataAssets = data.products;
                setAssets(dataAssets);
                setFilteredAssets(dataAssets); // Initially show all assets
            } catch (err) {
                console.error('Error fetching spot products:', err);
                setError('Failed to load assets');
            } finally {
                setLoading(false);
            }
        };
        fetchAssets();
    }, []);

    // Debounced filter for search
    const filterAssets = debounce((term) => {
        if (term === '') {
            setFilteredAssets(assets);
        } else {
            const lowerCaseTerm = term.toLowerCase();
            const filtered = assets.filter((asset) =>
                asset.display_name.toLowerCase().includes(lowerCaseTerm)
            );
            setFilteredAssets(filtered);
        }
    }, 300);

    useEffect(() => {
        filterAssets(searchTerm);
    }, [searchTerm, assets]);

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

    const handleAssetSelect = (asset) => {
        setSelectedAsset(asset.display_name);
        setSearchTerm('');
        handleDrawerClose();
    };

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
                        placeholder={loading ? 'Loading assets...' : 'Search tradable assets'}
                    />
                    <List sx={{ mt: 2, maxHeight: 650, overflowY: 'auto' }}>
                        {filteredAssets.map((asset) => (
                            <ListItem
                                button
                                key={asset.product_id}
                                selected={selectedAsset === asset.display_name}
                                onClick={() => handleAssetSelect(asset)}
                            >
                                <ListItemText primary={asset.display_name} />
                            </ListItem>
                        ))}
                    </List>
                    {error && <Typography color="error">{error}</Typography>}
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
                <Typography variant="h6">
                    {selectedAsset
                        ? `Selected Asset: ${selectedAsset}`
                        : 'No asset selected'}
                </Typography>
            </Box>
        </Box>
    );
};

export default TradingHub;
