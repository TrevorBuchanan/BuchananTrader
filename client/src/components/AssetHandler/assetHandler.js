import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import styles from './assetHandler.module.css';

// Stop bouncing on moves
// Add panning
// Fetch historical values
// Fix buttons and css
// Fix slider update

const AssetHandler = ({ targetAsset, onRemove, updateFrequency = 5 }) => {
    const [updateFrequencyVal, setValue] = useState(updateFrequency);
    const [tempValue, setTempValue] = useState(updateFrequency);
    // Initialize states
    const [seriesData, setSeriesData] = useState([
        { name: targetAsset, data: [] }
    ]);
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Update tempValue while the slider is moving (but not the actual value)
    const handleTempChange = (e) => {
        setTempValue(parseFloat(e.target.value));
    };

    // Only set the actual value when the user releases the slider
    const handleSliderRelease = () => {
        setValue(tempValue);
    };

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await axios.get(`/api/coinbase/products/${targetAsset}`);
                const priceData = response.data;
                // Append new price and update series
                setSeriesData(prevSeries => [
                    {
                        ...prevSeries[0],
                        data: [...prevSeries[0].data, parseFloat(priceData.price)],
                    },
                ]);

                // Append new date
                setDates(prevDates => [
                    ...prevDates,
                    new Date().toLocaleTimeString(), // Format time for easier viewing
                ]);

                setLoading(false);
            } catch (err) {
                setError('Failed to fetch prices');
                setLoading(false);
            }
        };

        // Start polling at a set interval
        const intervalId = setInterval(() => {
            fetchPrices(); // Fetch data on each interval
        }, updateFrequencyVal * 1000);

        fetchPrices(); // Initial fetch

        return () => clearInterval(intervalId); // Cleanup interval on unmount or when dependencies change
    }, [updateFrequencyVal, targetAsset]);

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
                <div className={styles.sliderContainer}>
                    <input
                        className={styles.slider}
                        type="range"
                        min="0.5"
                        max="10.0"
                        step="0.1" // Adjust the step for precision
                        value={updateFrequencyVal}
                        onChange={handleTempChange} // Update tempValue while dragging
                        onMouseUp={handleSliderRelease} // Commit value when mouse is released
                        onTouchEnd={handleSliderRelease} // Commit value on touch end for mobile
                    />
                    <p>Update Frequency: {updateFrequencyVal} Seconds</p>
                </div>
                <button className={styles.startTradingButton}>START Trading</button>
                <button className={styles.stopTradingButton}>STOP Trading</button>
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

export default AssetHandler;
