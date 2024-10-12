import React, { useState, useEffect } from 'react';
import styles from './assetSearch.module.css';

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

const AssetSearch = () => {
    const [assets, setAssets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isFocused, setIsFocused] = useState(false); // Track if input is focused

    // Fetch spot products
    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const response = await fetch('/api/coinbase/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const dataAssets = data['products'];
                setAssets(dataAssets);
                setFilteredAssets(dataAssets); // Initially show all assets
            } catch (error) {
                console.error('Error fetching spot products:', error);
                setError('Failed to load assets');
            } finally {
                setLoading(false);
            }
        };
        fetchAssets();
    }, []);

    // Filter assets based on search term
    const filterAssets = debounce((term) => {
        if (term === '') {
            setFilteredAssets(assets); // Show all assets if search term is empty
        } else {
            const lowerCaseTerm = term.toLowerCase();
            const filtered = assets.filter(asset =>
                asset.display_name.toLowerCase().includes(lowerCaseTerm)
            );
            setFilteredAssets(filtered);
        }
    }, 300);

    useEffect(() => {
        filterAssets(searchTerm);
    }, [searchTerm, assets]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleAssetSelect = (asset) => {
        setSearchTerm(asset.display_name); // Set the search term to the selected asset name
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div className={styles.container}>
            <h3>Search Spot Tradable Assets</h3>
            {loading && <p>Loading assets...</p>}
            {error && <p className={styles.error}>{error}</p>}
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search assets"
                className={styles.searchInput}
                onFocus={handleFocus}
                onBlur={handleBlur} // Track focus state
            />
            {(isFocused && filteredAssets.length > 0) ? ( // Show dropdown if input is focused and there are results
                <ul className={styles.dropdown}>
                    {filteredAssets.map((asset) => (
                        <li
                            key={asset.product_id}
                            onClick={() => handleAssetSelect(asset)}
                            className={styles.dropdownItem}
                        >
                            {asset.display_name}
                        </li>
                    ))}
                </ul>
            ) : (
                isFocused && searchTerm && <p className={styles.noResults}>No results found.</p>
            )}
        </div>
    );
};

export default AssetSearch;
