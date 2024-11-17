import React, { useEffect, useState } from "react";
import SeriesChart from "../SeriesChart/seriesChart";
import styles from "./assetController.module.css";
import {
    addAssetPriceToEngine,
    getAssetProfitLoss,
    getCoinbaseAssetPrice,
    logAssetPrice,
    removeAsset,
    tradeAsset
} from "../../api";

const AssetController = ({ targetAsset, onRemove }) => {
    const [frequency, setFrequency] = useState(10);
    const [priceSeries, setPriceSeries] = useState([]);
    const [profitLossSeries, setProfitLossSeries] = useState([]);
    const [timeSeries, setTimeSeries] = useState([]);
    const [isRemoving, setIsRemoving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [priceChartVisibility, setPriceChartVisibility] = useState(true);
    const [profitLossChartVisibility, setProfitLossChartVisibility] = useState(false);
    const [isTrading, setIsTrading] = useState(false);
    const [isLogging, setIsLogging] = useState(false);
    const [error, setError] = useState(null);

    const handleRemoveAsset = async () => {
        setIsRemoving(true);
        try {
            await removeAsset(targetAsset);
            onRemove(targetAsset);
        } catch (error) {
            setError(`Error removing asset ${targetAsset}: ${error.message}`);
            console.error(error);
        } finally {
            setIsRemoving(false);
        }
    };

    const toggleLogging = () => setIsLogging((prev) => !prev);
    const toggleTrading = () => setIsTrading((prev) => !prev);
    const togglePriceChartVisibility = () => setPriceChartVisibility((prev) => !prev);
    const toggleProfitLossChartVisibility = () => setProfitLossChartVisibility((prev) => !prev);

    const handleFrequencyChange = (value) => {
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue) && parsedValue > 0) {
            setFrequency(parsedValue);
        }
    };

    useEffect(() => {
        const update = async () => {
            try {
                const result = await getCoinbaseAssetPrice(targetAsset);
                const price = result.price;
                const time = new Date().toLocaleTimeString();

                await addAssetPriceToEngine(targetAsset, price, time);

                if (isLogging) {
                    await logAssetPrice(targetAsset, price, time);
                }
                if (isTrading) {
                    await tradeAsset(targetAsset);
                }

                const { profitLoss } = await getAssetProfitLoss(targetAsset, price, time);

                setPriceSeries((prev) => [...prev, price]);
                setProfitLossSeries((prev) => [...prev, profitLoss]);
                setTimeSeries((prev) => [...prev, time]);

            } catch (error) {
                setError(`Error updating asset ${targetAsset}: ${error.message}`);
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        const intervalId = setInterval(update, frequency * 1000);

        update();

        return () => clearInterval(intervalId);
    }, [frequency, isLogging, isTrading, targetAsset]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.assetView}>
            <h2>{targetAsset}</h2>
            <button
                className={styles.removeButton}
                onClick={handleRemoveAsset}
                aria-label="Remove"
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
                            onClick={toggleLogging}
                            className={styles.actionButton}
                        >
                            {isLogging ? "Stop Logging Prices" : "Start Logging Prices"}
                        </button>
                    </td>
                    <td>
                        <button
                            onClick={toggleTrading}
                            className={styles.actionButton}
                        >
                            {isTrading ? "Active" : "Inactive"}
                        </button>
                    </td>
                    <td>
                        <input
                            type="number"
                            onBlur={(e) => handleFrequencyChange(e.target.value)}
                            className={styles.frequencyInput}
                        />
                    </td>
                    <td>
                        <button
                            onClick={togglePriceChartVisibility}
                            className={styles.actionButton}
                        >
                            {priceChartVisibility ? "Hide" : "Show"}
                        </button>
                    </td>
                    <td>
                        <button
                            onClick={toggleProfitLossChartVisibility}
                            className={styles.actionButton}
                        >
                            {profitLossChartVisibility ? "Hide" : "Show"}
                        </button>
                    </td>
                </tr>
                {priceChartVisibility && (
                    <tr>
                        <td colSpan="5">
                            <SeriesChart series={[{ name: "Price", data: priceSeries }]} labels={timeSeries} />
                        </td>
                    </tr>
                )}
                {profitLossChartVisibility && (
                    <tr>
                        <td colSpan="5">
                            <SeriesChart series={[{ name: "Price & Loss", data: profitLossSeries }]} labels={timeSeries} />
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
};

export default AssetController;
