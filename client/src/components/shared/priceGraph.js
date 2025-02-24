import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import {
    Button,
    Select,
} from '@mui/material';

const PriceGraph = () => {
  const [timeRange, setTimeRange] = useState(60); // Default to 1 minute
  const [data, setData] = useState([]); // Price series data
  const [options, setOptions] = useState({
    chart: {
      id: "price-series",
      type: "line",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      zoom: {
        enabled: true,
      },
      toolbar: {
        autoSelected: "zoom",
        tools: {
          zoom: true,
          pan: true,
          reset: true,
        },
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      title: {
        text: "Price",
      },
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Price",
      data: [],
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const price = Math.random() * 100; // Simulated price data

      setData((prevData) => {
        const newData = [...prevData, { x: now, y: price }];
        const filteredData = newData.filter(
          (point) => now - point.x <= timeRange * 1000 // Filter data within the selected time range
        );
        return filteredData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRange]);

  useEffect(() => {
    setSeries([
      {
        name: "Price",
        data: data,
      },
    ]);
  }, [data]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <Select
          value={timeRange}
          onValueChange={(value) => handleTimeRangeChange(Number(value))}
        >
          <option value={60}>1 Minute</option>
          <option value={300}>5 Minutes</option>
          <option value={900}>15 Minutes</option>
          <option value={3600}>1 Hour</option>
          <option value={21600}>6 Hours</option>
          <option value={86400}>1 Day</option>
        </Select>
        <Button onClick={() => setData([])}>Reset</Button>
      </div>
      <Chart
        options={options}
        series={series}
        type="line"
        height={400}
      />
    </div>
  );
};

export default PriceGraph;
