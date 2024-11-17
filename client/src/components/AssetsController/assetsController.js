import React, { useState } from "react";
import AssetController from "../AssetController/assetController.js";
import AssetSearch from "../AssetSearch/assetSearch";
import styles from "./assetsController.module.css";

const AssetsController = () => {
    const [targetAssets, setTargetAssets] = useState([]);

    const onAssetSelect = (asset) => {
        if (!targetAssets.includes(asset)) {
            setTargetAssets((prevAssets) => [...prevAssets, asset]);
        }
    };

    const handleRemoveAsset = (asset) => {
        setTargetAssets((prevAssets) => prevAssets.filter((a) => a !== asset));
    };

    return (
        <main>
            <div className={styles.row}>
                <div className={styles.leftCol}>
                    {targetAssets.length > 0 ? (
                        targetAssets.map((asset, index) => (
                            <div key={index} className={styles.asset}>
                                <AssetController
                                    targetAsset={asset}
                                    onRemove={handleRemoveAsset}
                                />
                            </div>
                        ))
                    ) : (
                        <p>Search and select tradable assets to open viewer</p>
                    )}
                </div>
                <div className={styles.rightCol}>
                    <div className={styles.searchContainer}>
                        <AssetSearch onAssetSelect={onAssetSelect} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AssetsController;
