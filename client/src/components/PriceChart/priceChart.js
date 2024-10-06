import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

import styles from './priceChart.module.css'

const PriceChart = ({chartName}) => {
    const [seriesData, setSeriesData] = useState([]);
    const [dates, setDates] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/graph-data'); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                
                if (!data || !Array.isArray(data)) {
                    throw new Error('Invalid data format from API');
                }

                // Extract timestamps
                const timeStamps = data.map(item => new Date(item.timestamp).toLocaleDateString());

                // Process series data
                const series = {};

                data.forEach(item => {
                    item.series.forEach(priceItem => {
                        if (!series[priceItem.name]) {
                            series[priceItem.name] = [];
                        }
                        series[priceItem.name].push(priceItem.price);
                    });
                });

                // Format series data for ApexCharts
                const formattedSeries = Object.keys(series).map(name => ({
                    name: name,
                    data: series[name]
                }));

                setDates(timeStamps);
                setSeriesData(formattedSeries);
            } catch (error) {
                console.error('Error fetching price data:', error);
                setError('Failed to load chart data');
            }
        };

        fetchData();
    }, []);

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
            categories: dates,
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

    return (
        <div className={styles.priceTimeGraph}>
            <h2 className={styles.chartTitle}>{chartName}</h2>
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
