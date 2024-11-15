import React, { useState } from "react";
import ProfitLossChart from "../ProfitLossChart/profitLossChart";
import AssetViewer from "../AssetViewer/assetViewer";
import AssetHandler from "../assetHandler";
import styles from "./assetsController.module.css";
import AssetSearch from "../AssetSearch/assetSearch";

const AssetsController = () => {
    const [targetAssets, setTargetAssets] = useState([]);
    const [chartVisibility, setChartVisibility] = useState({});
    const [tradingStatus, setTradingStatus] = useState({});
    const [loggingStatus, setLoggingStatus] = useState({});
    const [frequencies, setFrequencies] = useState({});

    const handleAssetChange = (asset) => {
        if (!targetAssets.includes(asset)) {
            setTargetAssets((prevAssets) => [...prevAssets, asset]);
        }
    };

    const handleRemoveAsset = async (asset) => {
        setTargetAssets((prevAssets) => prevAssets.filter((a) => a !== asset));
        try {
            // Remove the asset from the AssetHandler and backend
            await AssetHandler.getInstance().removeAsset(asset);
        } catch (error) {
            console.error(`Error removing asset ${asset}:`, error.message);
        }
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

    const toggleChartVisibility = (asset) => {
        setChartVisibility((prev) => ({
            ...prev,
            [asset]: !prev[asset],
        }));
    };

    const handleFrequencyChange = (asset, value) => {
        setFrequencies((prev) => ({
            ...prev,
            [asset]: value,
        }));
    };

    return (
        <main>
            <div className={styles.row}>
                <div className={styles.leftCol}>
                    {targetAssets.length > 0 ? (
                        targetAssets.map((asset, index) => (
                            <div key={index} className={styles.assetView}>
                                <h3>{asset}</h3>
                                <button
                                    onClick={() => toggleLogging(asset)}
                                    className={styles.actionButton}
                                >
                                    {loggingStatus[asset] ? "Stop Logging Prices" : "Start Logging Prices"}
                                </button>
                                <button
                                    onClick={() => toggleTrading(asset)}
                                    className={styles.actionButton}
                                >
                                    {tradingStatus[asset] ? "Stop Trading" : "Start Trading"}
                                </button>
                                <input
                                    type="number"
                                    placeholder="Update Frequency (ms)"
                                    value={frequencies[asset] || ""}
                                    onChange={(e) => handleFrequencyChange(asset, e.target.value)}
                                    className={styles.frequencyInput}
                                />
                                <button
                                    onClick={() => toggleChartVisibility(asset)}
                                    className={styles.actionButton}
                                >
                                    {chartVisibility[asset] ? "Hide Price Chart" : "Show Price Chart"}
                                </button>
                                {tradingStatus[asset] && (
                                    <button
                                        onClick={() => toggleChartVisibility(asset, "profitLoss")}
                                        className={styles.actionButton}
                                    >
                                        {chartVisibility[`${asset}_profitLoss`]
                                            ? "Hide Profit/Loss Chart"
                                            : "Show Profit/Loss Chart"}
                                    </button>
                                )}
                                {chartVisibility[asset] && (
                                    <AssetViewer
                                        targetAsset={asset}
                                        onRemove={handleRemoveAsset}
                                        updateFrequency={frequencies[asset]}
                                    />
                                )}
                                {tradingStatus[asset] && chartVisibility[`${asset}_profitLoss`] && (
                                    <ProfitLossChart
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

export default AssetsController;
