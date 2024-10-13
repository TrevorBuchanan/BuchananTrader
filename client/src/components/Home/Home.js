import React from 'react';
import PriceChart from '../PriceChart/priceChart';
import AssetSearch from '../AssetSearch/assetSearch';
import styles from './home.module.css';


function Home() {
  return (
    <div className={styles.row}>
      <div className={styles.leftCol}></div>
      <div className={styles.middleCol}>
        {/* <PriceChart chartName="Profit and Loss"/> */}
        {/* <PriceChart chartName="Buying Tracker"/> */}
      </div>
      <div className={styles.rightCol}>
        <div className={styles.assetSearch}>
          <AssetSearch></AssetSearch>
        </div>
      </div>
    </div>
  );
}

export default Home;
