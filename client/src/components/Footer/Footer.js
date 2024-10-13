import React from 'react';

import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.pageFooter}>
      <p>&copy; {new Date().getFullYear()} Buchanan Trader. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
