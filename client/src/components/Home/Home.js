import React from 'react';
import PriceChart from '../PriceChart/priceChart';

import styles from './Home.module.css';


function Home() {
  return (<div className={styles.homeContainer}>
    <PriceChart chartName="Buying Tracker"/> {/* Render PriceChart */}
    {/* <PriceChart chartName="Profit and Loss"/> Render PriceChart */}
  </div>);
}

export default Home;
