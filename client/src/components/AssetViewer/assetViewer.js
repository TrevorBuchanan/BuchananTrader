import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import styles from './assetViewer.module.css';
import Index from '../../api';

const AssetViewer = () => {
    const priceSeries
    const profitLossSeries

    const showPriceChart = () => {

    }

    const showProfitLossChart = () => {

    }

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
