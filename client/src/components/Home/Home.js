// home.js

import AssetsController from '../AssetsController/assetsController'
import AssetSearch from '../AssetSearch/assetSearch';
import styles from './home.module.css';

function Home() {
    return (
        <main>
            <AssetsController />  // FIXME: Move to trading hub
        </main>
    );
}

export default Home;
