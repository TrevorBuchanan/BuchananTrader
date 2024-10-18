import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import styles from './priceChart.module.css';
import AssetHandler from '../assetHandler';

// Stop bouncing on moves
// Add panning
// Fetch historical values
// Fix buttons and css
// Fix slider update

const PriceChart = ({ targetAsset, onRemove, updateFrequency }) => {
    // Initialize states
    const [seriesData, setSeriesData] = useState([
        { name: targetAsset, data: [] }
    ]);
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const assetHandler = AssetHandler.getInstance();

        const updateSeries = async () => {
            try {
                // Fetch the updated prices for the asset
                await assetHandler.addCoinbasePrice(targetAsset);

                // Get the updated price series
                const priceSeries = assetHandler.getAssetPriceSeries(targetAsset);

                // Update the series data and dates
                const updatedData = priceSeries.map(item => item.price);
                const updatedDates = priceSeries.map(item => item.date);

                // Update state
                setSeriesData([{ name: targetAsset, data: updatedData }]);
                setDates(updatedDates);
                setLoading(false);
            } catch (err) {
                setError('Error fetching price data');
                setLoading(false);
            }
        };

        // Start polling at a set interval
        const intervalId = setInterval(() => {
            updateSeries();
        }, updateFrequency * 1000);

        updateSeries(); // Initial update

        return () => clearInterval(intervalId); // Clean up on component unmount
    }, [updateFrequency, targetAsset]);

    if (loading) return <div className={styles.statusText}>Loading...</div>;

    const chartOptions = {
        chart: {
            type: 'line',
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
            title: {
                text: 'Price',
            },
        },
        grid: {
            borderColor: '#3d3d3d',
        },
        stroke: {
            width: 2,
        },
        tooltip: {
            theme: 'dark',
            shared: true,
        },
        legend: {
            position: 'top',
        },
    };

    return (
        <div className={styles.priceTimeGraph}>
            <div className={styles.titleSection}>
                <h2 className={styles.chartTitle}>{targetAsset} Price Tracker</h2>
                <div className={styles.tradingButtonsSection}>
                    <button className={styles.tradingButton}>Start Trading</button>
                    <button className={styles.tradingButton}>Stop Trading</button>
                </div>
                <button className={styles.removeButton} onClick={() => onRemove(targetAsset)}>X</button> {/* Remove button */}
            </div>
            {error ? (
                <div className={styles.statusText}>{error}</div>
            ) : (
                <Chart
                    options={chartOptions}
                    series={seriesData}
                    type="line"
                    height={350}
                />
            )}
        </div>
    );
};

export default PriceChart;
