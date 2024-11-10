// assetViewer.js

import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import styles from './assetViewer.module.css';
import AssetHandler from '../assetHandler';

// Stop bouncing on moves
// Add panning
// Fetch historical values
// Fix buttons and css
// Fix slider update

const AssetViewer = ({ targetAsset, onRemove, updateFrequency }) => {
    const [seriesData, setSeriesData] = useState([{ name: targetAsset, data: [] }]);
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isTrading, setIsTrading] = useState(false);

    useEffect(() => {
        const assetHandler = AssetHandler.getInstance();

        // Function to fetch and update price data
        const updateSeries = async () => {
            try {
                await assetHandler.addCoinbaseAssetPrice(targetAsset);  // Fetch the updated prices
                const priceSeries = assetHandler.getAssetPriceSeries(targetAsset); // Get price series

                const updatedData = priceSeries.map(item => item.price);
                const updatedDates = priceSeries.map(item => item.date);

                if (isTrading) {
                    await assetHandler.tradeAsset(targetAsset); // Trade if trading
                }

                setSeriesData([{ name: targetAsset, data: updatedData }]);
                setDates(updatedDates);
                setLoading(false);
            } catch (err) {
                setError('Error fetching price data');
                setLoading(false);
            }
        };

        // Update function with debounce to reduce frequent calls
        const debounce = (func, delay) => {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => func.apply(this, args), delay);
            };
        };
        const debouncedUpdateSeries = debounce(updateSeries, 500);

        // Start polling
        const intervalId = setInterval(() => {
            debouncedUpdateSeries();
        }, updateFrequency * 1000);

        updateSeries(); // Initial data fetch

        return () => {
            clearInterval(intervalId);  // Clear the polling interval
            setIsTrading(false);  // Reset trading state on unmount
        };
    }, [updateFrequency, targetAsset, isTrading]);

    const handleStartTrading = () => {
        setIsTrading(true);
    };

    const handleStopTrading = () => {
        setIsTrading(false);
    };

    if (loading) return <div className={styles.statusText}>Loading...</div>;

    const chartOptions = {
        chart: {
            type: 'line',
            animations: { enabled: true, easing: 'linear', speed: 800 },
            toolbar: {
                tools: {
                    download: true,
                    selection: true,
                    zoom: false,
                    zoomin: false,
                    zoomout: false, 
                    pan: true,
                    reset: true,
                },
                autoSelected: 'zoom',
            },
        },
        xaxis: {
            categories: dates,
        },
        yaxis: {
            title: { text: 'Price' },
        },
        grid: { borderColor: '#3d3d3d' },
        stroke: { width: 2 },
        tooltip: {
            theme: 'dark',
            shared: true,
        },
        legend: { position: 'top' },
    };

    return (
        <div className={styles.priceTimeGraph}>
            <div className={styles.titleSection}>
                <h2 className={styles.chartTitle}>
                    {targetAsset} Price Tracker {isTrading && <span className={styles.tradingIndicator}>Trading...</span>}
                </h2>
                <div className={styles.tradingButtonsSection}>
                    <button 
                        className={styles.tradingButton} 
                        onClick={handleStartTrading} 
                        disabled={isTrading} 
                        aria-label={`Start trading ${targetAsset}`}
                    >
                        Start Trading
                    </button>
                    <button 
                        className={styles.tradingButton} 
                        onClick={handleStopTrading} 
                        disabled={!isTrading}
                        aria-label={`Stop trading ${targetAsset}`}
                    >
                        Stop Trading
                    </button>
                </div>
                <button 
                    className={styles.removeButton} 
                    onClick={() => onRemove(targetAsset)}
                    aria-label={`Remove ${targetAsset}`}
                >
                    X
                </button>
            </div>
            {error ? (
                <div className={styles.statusText}>
                    {error} <button onClick={updateSeries} className={styles.retryButton}>Retry</button>
                </div>
            ) : (
                <Chart options={chartOptions} series={seriesData} type="line" height={350} />
            )}
        </div>
    );
};

export default AssetViewer;
