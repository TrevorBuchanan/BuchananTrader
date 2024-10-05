import React from 'react';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Buchanan Trader. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
