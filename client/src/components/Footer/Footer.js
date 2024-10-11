import React from 'react';

import styles from './footer.module.css';

const Footer = () => {
  return (
    <>
    <footer>
      <p>&copy; {new Date().getFullYear()} Buchanan Trader. All rights reserved.</p>
    </footer>
    <div className={styles.spacer}></div>
    </>
  );
};

export default Footer;
