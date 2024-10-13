import React from 'react';
import PriceChart from '../PriceChart/priceChart';
import AssetSearch from '../AssetSearch/assetSearch';
import styles from './home.module.css';


function Home() {
  return (
    <div className={styles.row}>
      <div className={styles.leftCol}>
        <PriceChart targetAsset="SEI-USD"/>
        <PriceChart targetAsset="BTC-USD"/>
      </div>
      <div className={styles.middleCol}>
        <PriceChart targetAsset="ETH-USD"/>
        <PriceChart targetAsset="SOL-USD"/>
      </div>
      <div className={styles.rightCol}>
        <AssetSearch></AssetSearch>
      </div>
    </div>
  );
}

export default Home;
