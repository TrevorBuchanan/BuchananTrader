import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import styles from './profitLossChart.module.css';

const ProfitLossChart = ({ targetAsset, onRemove, updateFrequency = 5000 }) => {
    // Initialize states
    const [seriesData, setSeriesData] = useState([
        { name: targetAsset, data: [] }
    ]);
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await axios.get(`/api/profit-loss`);
                console.log(response.data);
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
        }, updateFrequency);

        fetchPrices(); // Initial fetch

        return () => clearInterval(intervalId); // Cleanup interval on unmount or when dependencies change
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
