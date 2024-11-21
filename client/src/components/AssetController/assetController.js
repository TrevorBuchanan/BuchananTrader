import React, {useEffect, useState} from "react";
import SeriesChart from "../SeriesChart/seriesChart";
import styles from "./assetController.module.css";
import {
    addAssetPriceToEngine,
    getAssetProfitLoss,
    getCoinbaseAssetPrice,
    logAssetPrice,
    removeAsset,
    tradeAsset,
    getAssetLongLossLimit,
    getAssetShortLossLimit, closeEngineAssetAllPositions,
} from "../../api";

const AssetController = ({targetAsset, onRemove}) => {
    // Asset controller
    const [frequency, setFrequency] = useState(10);
    const [tempFrequency, setTempFrequency] = useState(frequency);
    const [isRemoving, setIsRemoving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Series
    const [priceSeries, setPriceSeries] = useState([]);
    const [profitLossSeries, setProfitLossSeries] = useState([]);
    const [timeSeries, setTimeSeries] = useState([]);
    const [longLossLimitSeries, setLongLossLimitSeries] = useState([]);
    const [shortLossLimitSeries, setShortLossLimitSeries] = useState([]);

    // Toggles
    const [priceChartVisibility, setPriceChartVisibility] = useState(true);
    const [profitLossChartVisibility, setProfitLossChartVisibility] = useState(false);
    const [longLossLimitVisibility, setLongLossLimitVisibility] = useState(true);
    const [shortLossLimitVisibility, setShortLossLimitVisibility] = useState(true);
    const [isTrading, setIsTrading] = useState(false);
    const [isLogging, setIsLogging] = useState(false);

    // Engine
    const [maxLossLimit, setMaxLossLimit] = useState(10);
    const [tempMaxLossLimit, setTempMaxLossLimit] = useState(frequency);


    const setInitialEngineUseStates = async () => {

    }

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
    const toggleTrading = async () => {
        if (isTrading) {
            // If currently trading, attempt to close all positions
            try {
                await closeEngineAssetAllPositions(targetAsset);
            } catch (error) {
                setError(`Error closing positions for asset in engine ${targetAsset}: ${error.message}`);
                console.error(error);
            }
        }

        // Toggle the trading state
        setIsTrading((prev) => !prev);
    };
    const togglePriceChartVisibility = () => setPriceChartVisibility((prev) => !prev);
    const toggleProfitLossChartVisibility = () => setProfitLossChartVisibility((prev) => !prev);
    const toggleLongLossVisibility = () => setLongLossLimitVisibility((prev) => !prev);
    const toggleShortLossLimit = () => setShortLossLimitVisibility((prev) => !prev);

    const handleFrequencyChange = (value) => {
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue) && parsedValue > 0) {
            setFrequency(parsedValue);
        } else {
            setFrequency(10); // Default frequency value is 10
        }
    };

    useEffect(() => {
        const update = async () => {
            try {
                const time = new Date().toLocaleTimeString();
                const { price } = await getCoinbaseAssetPrice(targetAsset);
                await addAssetPriceToEngine(targetAsset, price, time);

                if (isLogging) {
                    await logAssetPrice(targetAsset, price, time);
                }
                if (isTrading) {
                    await tradeAsset(targetAsset);
                }

                const {profitLoss} = await getAssetProfitLoss(targetAsset, price, time);
                const { longLossLimit } = await getAssetLongLossLimit(targetAsset);
                const { shortLossLimit } = await getAssetShortLossLimit(targetAsset);

                setPriceSeries((prev) => [...prev, price]);
                setProfitLossSeries((prev) => [...prev, profitLoss]);
                setTimeSeries((prev) => [...prev, time]);
                setLongLossLimitSeries((prev) => [...prev, longLossLimit]);
                setShortLossLimitSeries((prev) => [...prev, shortLossLimit]);

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
        return <div>
            <table>
                <thead>
                <tr>
                    <th>Loading...</th>
                </tr>
                </thead>
            </table>
        </div>;
    }

    if (isRemoving) {
        return <div>
            <table>
                <thead>
                <tr>
                    <th>Removing...</th>
                </tr>
                </thead>
            </table>
        </div>;
    }

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th colSpan="5">
                        <div className={styles.titleContainer}>
                            <h2>{targetAsset}</h2>
                            <button
                                className={styles.removeButton}
                                onClick={handleRemoveAsset}
                                aria-label="Remove"
                            >
                                X
                            </button>
                        </div>
                    </th>
                </tr>
                <tr>
                    <th>Log Prices</th>
                    <th>Trade Asset</th>
                    <th>Update Frequency (sec) </th>
                    <th>Price Chart</th>
                    <th>Profit & Loss Chart</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <button
                            onClick={toggleLogging}
                            className={`${styles.actionButton} ${isLogging ? styles.activeButton : styles.inactiveButton}`}
                        >
                            {isLogging ? "Stop" : "Start"}
                        </button>
                    </td>
                    <td>
                        <button
                            onClick={toggleTrading}
                            className={`${styles.actionButton} ${isTrading ? styles.activeButton : styles.inactiveButton}`}
                        >
                            {isTrading ? "Stop" : "Start"}
                        </button>
                    </td>
                    <td>
                        <input
                            type="number"
                            value={tempFrequency}
                            onChange={(e) => setTempFrequency(parseInt(e.target.value))}
                            onBlur={(e) => handleFrequencyChange(e.target.value)}
                            className={styles.tableInput}
                        />
                    </td>
                    <td>
                        <button
                            onClick={togglePriceChartVisibility}
                            className={`${styles.actionButton} ${priceChartVisibility ? styles.activeButton : styles.inactiveButton}`}
                        >
                            {priceChartVisibility ? "Hide" : "Show"}
                        </button>
                    </td>
                    <td>
                        <button
                            onClick={toggleProfitLossChartVisibility}
                            className={`${styles.actionButton} ${profitLossChartVisibility ? styles.activeButton : styles.inactiveButton}`}
                        >
                            {profitLossChartVisibility ? "Hide" : "Show"}
                        </button>
                    </td>
                </tr>
                <tr>
                    <th colSpan="5">
                        <h3>
                            Trading Engine Settings
                        </h3>
                    </th>
                </tr>
                <tr>
                    <th>Follow Fraction</th>
                    <th>Min Series Length</th>
                    <th>Max Loss Limit</th>
                    <th>Show Long Limit</th>
                    <th>Show Short Limit</th>
                </tr>
                <tr>
                    <td>
                        {/* Follow Fraction */}
                        <input
                            type="number"
                            className={styles.tableInput}
                            value={0}
                        />
                    </td>
                    <td>
                        {/* Min Series Length */}
                        <input
                            type="number"
                            className={styles.tableInput}
                            value={0}
                        />
                    </td>
                    <td>
                        {/* Max Loss Limit */}
                        <input
                            type="number"
                            className={styles.tableInput}
                            value={0}
                        />
                    </td>
                    <td>
                        {/* Show Long Limit */}
                        <button
                            onClick={toggleLongLossVisibility}
                            className={`${styles.actionButton} ${longLossLimitVisibility ? styles.activeButton : styles.inactiveButton}`}
                            disabled={!priceChartVisibility}
                        >
                            {longLossLimitVisibility ? "Hide" : "Show"}
                        </button>
                    </td>
                    <td>
                        {/* Show Short Limit */}
                        <button
                            onClick={toggleShortLossLimit}
                            className={`${styles.actionButton} ${shortLossLimitVisibility ? styles.activeButton : styles.inactiveButton}`}
                            disabled={!priceChartVisibility}
                        >
                            {shortLossLimitVisibility ? "Hide" : "Show"}
                        </button>
                    </td>
                </tr>
                {priceChartVisibility && (
                    <tr>
                        <td colSpan="5">
                            <SeriesChart
                                name={"Price Chart"}
                                series={
                                    longLossLimitVisibility && shortLossLimitVisibility
                                        ? [
                                            {name: "Price", data: priceSeries},
                                            {name: "Long Loss Limit", data: longLossLimitSeries},
                                            {name: "Short Loss Limit", data: shortLossLimitSeries}
                                        ]
                                        : longLossLimitVisibility
                                            ? [
                                                {name: "Price", data: priceSeries},
                                                {name: "Long Loss Limit", data: longLossLimitSeries}
                                            ]
                                            : shortLossLimitVisibility
                                                ? [
                                                    {name: "Price", data: priceSeries},
                                                    {name: "Short Loss Limit", data: shortLossLimitSeries}
                                                ]
                                                : [
                                                    {name: "Price", data: priceSeries}
                                                ]
                                }
                                labels={timeSeries}
                            />
                        </td>
                    </tr>
                )}
                {profitLossChartVisibility && (
                    <tr>
                        <td colSpan="5">
                            <SeriesChart name={"Profit & Loss Chart"}
                                         series={[{name: "Profit & Loss", data: profitLossSeries}]} labels={timeSeries}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            {/*{error && <div className={styles.error}>{error}</div>}*/}
        </div>
    );
};

export default AssetController;
