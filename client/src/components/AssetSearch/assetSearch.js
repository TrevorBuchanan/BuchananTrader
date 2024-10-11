import React, { useState, useEffect } from 'react';
import styles from './assetSearch.module.css';

const AssetSearch = () => {
    const [spotAssets, setSpotAssets] = useState([]);
    const [searchSpot, setSearchSpot] = useState('');
    // Fetch spot products
    useEffect(() => {
        // fetch('/api/coinbase/spot-products')
        fetch('/api/coinbase/products')
            .then(response => response.json())
            .then(data => {
                console.log('Spot Products Data:', data); // Log the response to inspect
                setSpotAssets(data); // Set data directly if it's already an array
            })
            .catch(error => console.error('Error fetching spot products:', error));
    }, []);

    // Filtered search results for spot assets
    const filteredSpot = spotAssets.filter(asset =>
        asset.base_currency.toLowerCase().includes(searchSpot.toLowerCase())
    );

    return (
        <div>
            <h2>Search Spot Tradable Assets</h2>
            <input
                type="text"
                placeholder="Search spot assets"
                value={searchSpot}
                onChange={(e) => setSearchSpot(e.target.value)}
            />
            <ul>
                {filteredSpot.map(asset => (
                    <li key={asset.id}>{asset.base_currency} / {asset.quote_currency}</li>
                ))}
            </ul>
        </div>
    );
}

export default AssetSearch;
