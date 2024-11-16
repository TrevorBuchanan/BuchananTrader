import React, {useState} from "react";
import AssetController from "../AssetController/assetController.js";
import AssetSearch from "../AssetSearch/assetSearch";
import {removeAsset} from "../../api";

const AssetsController = () => {
    const [targetAssets, setTargetAssets] = useState([]);

    const onAssetSelect = (asset) => {
        if (!targetAssets.includes(asset)) {
            setTargetAssets((prevAssets) => [...prevAssets, asset]);
        }
    };

    const handleRemoveAsset = async (asset) => {
        try {
            await removeAsset(asset);
        } catch (error) {
            console.error(`Error removing asset ${asset}:`, error.message);
        } finally {
            setTargetAssets((prevAssets) => prevAssets.filter((a) => a !== asset));
        }
    };

    return (
        <main>
            <div className={styles.row}>a
                <div className={styles.leftCol}>
                    assetController list
                </div>
                <div className={styles.rightCol}>
                    <AssetSearch onAssetSelect={onAssetSelect}/>
                </div>
            </div>
        </main>
    );
};

export default AssetsController;
