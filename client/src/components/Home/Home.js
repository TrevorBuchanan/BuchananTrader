import React, { useState } from 'react';
import ProfitLossChart from '../ProfitLossChart/profitLossChart';
import AssetViewer from '../AssetViewer/assetViewer';
import AssetSearch from '../AssetSearch/assetSearch';
import AssetHandler from '../assetHandler';
import styles from './home.module.css';

function Home() {
  const [targetAssets, setTargetAssets] = useState([]); 
  const UPDATE_FREQUENCY = 1; // 1 second 

  const handleAssetChange = (asset) => {
    if (!targetAssets.includes(asset)) {
      setTargetAssets((prevAssets) => [...prevAssets, asset]); 
    }
  };

  const handleRemoveAsset = (asset) => {
    setTargetAssets((prevAssets) => prevAssets.filter((a) => a !== asset)); 
    AssetHandler.getInstance().removeAsset(asset);
  };


  return (
    <div className={styles.row}>
      <div className={styles.leftCol}>
        {targetAssets.length > 0 ? (
          targetAssets.map((asset, index) => (
            <ProfitLossChart key={index} targetAsset={asset} onRemove={handleRemoveAsset} updateFrequency={UPDATE_FREQUENCY}/>
          ))
        ) : (
          <p>Search tradable assets to add a profit-loss chart</p> 
        )}
      </div>
      <div className={styles.middleCol}>
        {targetAssets.length > 0 ? (
          targetAssets.map((asset, index) => (
            <AssetViewer key={index} targetAsset={asset} onRemove={handleRemoveAsset} updateFrequency={UPDATE_FREQUENCY} />
          ))
        ) : (
          <p>Search tradable assets to add a trading chart</p> 
        )}
      </div>
      <div className={styles.rightCol}>
        <AssetSearch onAssetSelect={handleAssetChange} /> 
      </div>
    </div>
  );
}

export default Home;
