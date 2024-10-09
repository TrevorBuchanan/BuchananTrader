import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import styles from './priceChart.module.css';

const PriceChart = ({ chartName }) => {
    const [seriesData, setSeriesData] = useState([{ name: 'Bitcoin', data: [] }]);
    const [dates, setDates] = useState([]); // Timestamps for the chart
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [interval, setIntervalState] = useState(5000); // Default to 5 seconds

    useEffect(() => {
        let intervalId;

        const fetchPrices = async () => {
            try {
                const response = await axios.get('/api/coinbase/prices');
                const priceData = response.data.data;

                // Append the new price and date to the series
                setSeriesData(prevSeries => [
                    {
                        ...prevSeries[0],
                        data: [...prevSeries[0].data, parseFloat(priceData.amount)],
                    },
                ]);

                // Append the current date to the dates array
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

        // Fetch the price at the set interval
        const startPolling = () => {
            fetchPrices(); // Initial fetch
            intervalId = setInterval(fetchPrices, interval);
        };

        startPolling();

        // Clear the interval on cleanup or when interval changes
        return () => clearInterval(intervalId);
    }, [interval]); // Re-run effect when interval changes

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const chartOptions = {
        chart: {
            type: 'line',
            toolbar: {
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true,
                },
                autoSelected: 'zoom',
            },
        },
        xaxis: {
            categories: dates, // Use the updated timestamps
        },
        yaxis: {
            title: {
                text: 'Price (USD)',
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

    const handleSliderChange = (event) => {
        const newInterval = Number(event.target.value);
        setIntervalState(newInterval); // Update the interval state
    };

    return (
        <div className={styles.priceTimeGraph}>
            <h2 className={styles.chartTitle}>{chartName}</h2>
            <div>
                <label className={styles.chartUpdateTime}>Update Interval: {interval / 10000} second(s)</label>
                <input
                    type="range"
                    min="1000"
                    max="60000"
                    value={interval}
                    step="1000"
                    onChange={handleSliderChange}
                />
            </div>
            {error ? (
                <div>{error}</div>
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
