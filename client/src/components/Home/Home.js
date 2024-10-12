import React from 'react';
import PriceChart from '../PriceChart/priceChart';
import AssetSearch from '../AssetSearch/assetSearch';
import styles from './home.module.css';


function Home() {
  return (<div className={styles.homeContainer}>
    <AssetSearch />
    {/* <PriceChart chartName="Buying Tracker"/> */}
    {/* <PriceChart chartName="Profit and Loss"/> */}
  </div>);
}

export default Home;
