import React, { useState } from 'react'; // Import useState
import ProfitLossChart from '../ProfitLossChart/profitLossChart';
import PriceChart from '../PriceChart/priceChart';
import AssetSearch from '../AssetSearch/assetSearch';
import AssetHandler from '../assetHandler';
import styles from './home.module.css';

function Home() {
  const [targetAssets, setTargetAssets] = useState([]); // Initialize state as an empty array

  // Callback function to update the target assets
  const handleAssetChange = (asset) => {
    // Check if the asset is already in the list
    if (!targetAssets.includes(asset)) {
      setTargetAssets((prevAssets) => [...prevAssets, asset]); // Add the new asset to the array
    }
  };

  const handleRemoveAsset = (asset) => {
    setTargetAssets((prevAssets) => prevAssets.filter((a) => a !== asset)); // Remove the specified asset
    AssetHandler.getInstance().removeAsset(asset);
  };


  return (
    <div className={styles.row}>
      <div className={styles.leftCol}>
        {targetAssets.length > 0 ? (
          targetAssets.map((asset, index) => (
            <ProfitLossChart key={index} targetAsset={asset} onRemove={handleRemoveAsset} updateFrequency={2}/>
          ))
        ) : (
          <p>Search tradable assets to add a profit-loss chart</p> // Placeholder message if no assets are selected
        )}
      </div>
      <div className={styles.middleCol}>
        {targetAssets.length > 0 ? (
          targetAssets.map((asset, index) => (
            <PriceChart key={index} targetAsset={asset} onRemove={handleRemoveAsset} updateFrequency={2} />
          ))
        ) : (
          <p>Search tradable assets to add a trading chart</p> // Placeholder message if no assets are selected
        )}
      </div>
      <div className={styles.rightCol}>
        <AssetSearch onAssetSelect={handleAssetChange} /> {/* Pass the callback to AssetSearch */}
      </div>
    </div>
  );
}

export default Home;
