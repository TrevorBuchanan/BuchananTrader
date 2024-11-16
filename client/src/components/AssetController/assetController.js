import React, { useState } from "react";
import SeriesChart from "../SeriesChart/seriesChart";
import AssetViewer from "../AssetViewer/assetViewer";
import styles from "./assetController.module.css";
import AssetSearch from "../AssetSearch/assetSearch";

const AssetController = () => {
    const [targetAssets, setTargetAssets] = useState([]);  // Manage the list of selected assets
    const [priceChartVisibility, setPriceChartVisibility] = useState({});
    const [profitLossChartVisibility, setProfitLossChartVisibility] = useState({});
    const [tradingStatus, setTradingStatus] = useState({});
    const [loggingStatus, setLoggingStatus] = useState({});
    const [frequency, setFrequency] = useState({});
    const [priceSeries, setPriceSeries] = useState({});
    const [profitLossSeries, setProfitLossSeries] = useState({});


    // Handle adding asset to targetAssets list
    const handleAssetChange = (asset) => {
        if (!targetAssets.includes(asset)) {
            setTargetAssets((prevAssets) => [...prevAssets, asset]);
        }
    };

    // Handle asset removal
    const handleRemoveAsset = (asset) => {
        setTargetAssets((prevAssets) => prevAssets.filter((a) => a !== asset));
        // If there's additional logic for removing from the backend (e.g., API call), you can call it here
    };

    const toggleLogging = (asset) => {
        setLoggingStatus((prev) => ({
            ...prev,
            [asset]: !prev[asset],
        }));
    };

    const toggleTrading = (asset) => {
        setTradingStatus((prev) => ({
            ...prev,
            [asset]: !prev[asset],
        }));
    };

    const togglePriceChartVisibility = (asset) => {
        setChartVisibility((prev) => ({
            ...prev,
            [`${asset}_price`]: !prev[`${asset}_price`],
        }));
    };

    const toggleProfitLossChartVisibility = (asset) => {
        setChartVisibility((prev) => ({
            ...prev,
            [`${asset}_profitLoss`]: !prev[`${asset}_profitLoss`],
        }));
    };

    // Handle frequency change (both onChange and onBlur)
    const handleFrequencyChange = (asset, value) => {
        setFrequencies((prev) => ({
            ...prev,
            [asset]: value > 0 ? Number(value) : 1, // Ensures frequency is always a positive number, defaults to 1
        }));
    };

    return (
        <main>
            <div className={styles.row}>
                <div className={styles.leftCol}>
                    {targetAssets.length > 0 ? (
                        targetAssets.map((asset, index) => (
                            <div key={index} className={styles.assetView}>
                                <h2>{asset}</h2>
                                <button
                                    className={styles.removeButton}
                                    onClick={() => handleRemoveAsset(asset)}
                                    aria-label={`Remove ${asset}`}
                                >
                                    X
                                </button>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Log Prices</th>
                                        <th>Trade Asset</th>
                                        <th>Update Frequency</th>
                                        <th>Price Chart</th>
                                        <th>Profit & Loss Chart</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <button
                                                onClick={() => toggleLogging(asset)}
                                                className={styles.actionButton}
                                            >
                                                {loggingStatus[asset]
                                                    ? "Stop Logging Prices"
                                                    : "Start Logging Prices"}
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => toggleTrading(asset)}
                                                className={styles.actionButton}
                                            >
                                                {tradingStatus[asset] ? "Active" : "Inactive"}
                                            </button>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                placeholder="Update Frequency (sec)"
                                                value={frequencies[asset] || 1}
                                                onChange={(e) =>
                                                    handleFrequencyChange(asset, e.target.value)
                                                }
                                                onBlur={(e) =>
                                                    handleFrequencyChange(asset, e.target.value)
                                                }
                                                className={styles.frequencyInput}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => togglePriceChartVisibility(asset)}
                                                className={styles.actionButton}
                                            >
                                                {chartVisibility[asset] ? "Hide" : "Show"}
                                            </button>
                                        </td>
                                        <td>
                                            {tradingStatus[asset] ? (
                                                <button
                                                    onClick={() =>
                                                        toggleProfitLossChartVisibility(asset)
                                                    }
                                                    className={styles.actionButton}
                                                >
                                                    {chartVisibility[`${asset}_profitLoss`] ? "Hide" : "Show"}
                                                </button>
                                            ) : (
                                                <span>Inactive</span>
                                            )}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                {chartVisibility[asset] && (
                                    <AssetViewer
                                        targetAsset={asset}
                                        onRemove={handleRemoveAsset}
                                        updateFrequency={frequencies[asset]}
                                    />
                                )}
                                {tradingStatus[asset] && chartVisibility[`${asset}_profitLoss`] && (
                                    <SeriesChart
                                        targetAsset={asset}
                                        onRemove={handleRemoveAsset}
                                        updateFrequency={frequencies[asset]}
                                    />
                                )}
                            </div>
                        ))
                    ) : (
                        <p>Search and select tradable assets to open viewer</p>
                    )}
                </div>
                <div className={styles.rightCol}>
                    <AssetSearch onAssetSelect={handleAssetChange} />
                </div>
            </div>
        </main>
    );
};

export default AssetController;
