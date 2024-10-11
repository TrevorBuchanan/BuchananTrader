import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

const Header = () => {
  return (
    <>
      <header>
        <div className={styles.headerContent}>
          {/* Nav bar content */}
          <nav className={styles.navbar}>
            {/* Nav bar title and logo */}
            <Link to="/" className={styles.logoTitleContainer}>
              <img src="logo.png" className={styles.logo} alt="Logo" />
              <h1 className={styles.title}>
                uchanan Trader
              </h1>
            </Link>

            {/* Nav bar links */}
            <ul className={styles.nav_links}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/user-profile">User Profile</Link></li>
              <li><Link to="/admin-profile">Admin Profile</Link></li>
              <li><Link to="/user-hub">User Trading Hub</Link></li>
              <li><Link to="/admin-hub">Admin Trading Hub</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <div className={styles.spacer}></div>
    </>
  );
};


export default Header;
