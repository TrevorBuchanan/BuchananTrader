// seriesChart.js

import Chart from 'react-apexcharts';
import styles from './seriesChart.module.css';

const SeriesChart = ({ name, series, labels }) => {
    const yAxisName = series[0].name;
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
            categories: labels,
        },
        yaxis: {
            title: {
                text: yAxisName,
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
            <h3 className={styles.chartTitle}>{name}</h3>
            <Chart
                options={chartOptions}
                series={series}
                type="line"
                height={350}
            />
        </div>
    );
};

export default SeriesChart;
