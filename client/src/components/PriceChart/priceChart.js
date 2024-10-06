import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const PriceChart = () => {
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    const fetchPriceData = async () => {
      const result = await axios.get('/api/coinbase/price');
      setPriceData(result.data);
    };
    fetchPriceData();
  }, []);

  const options = {
    chart: {
      id: 'price-chart',
    },
    xaxis: {
      type: 'datetime',
    },
  };

  const series = [{
    name: 'Price',
    data: priceData,
  }];

  return (
    <div>
      <h2>Coinbase Price Chart</h2>
      <Chart options={options} series={series} type="line" width="500" />
    </div>
  );
};

export default PriceChart;
