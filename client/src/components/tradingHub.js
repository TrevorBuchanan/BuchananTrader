import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
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
import { 
    getCoinbaseAssetsList,
} from '../api';
import SeriesGraph from './shared/priceGraph';

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
    const [drawerOpen, setDrawerOpen] = useState(false);
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
                const data = await getCoinbaseAssetsList();
                const assetsListData = data.products;
                setAssets(assetsListData);
                setFilteredAssets(assetsListData); // Initially show all assets
            } catch (err) {
                console.error('Error fetching assets list:', err);
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

    const handleDrawerOpen = () => setDrawerOpen(true);
    const handleDrawerClose = () => setDrawerOpen(false);

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
                <Button variant="outlined" color="primary" onClick={handleDrawerOpen}>
                    Select Asset
                </Button>
            </Box>

            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
                <Box width={300} p={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">Select Asset</Typography>
                        <IconButton onClick={handleDrawerClose}>
                            <CloseIcon />
                        </IconButton>
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
                    <List sx={{ mt: 2, maxHeight: 700, overflowY: 'auto' }}>
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
                        ? `${selectedAsset}`
                        : 'No asset selected'}
                </Typography>
                
                <SeriesGraph></SeriesGraph>

            </Box>
        </Box>
    );
};

export default TradingHub;
