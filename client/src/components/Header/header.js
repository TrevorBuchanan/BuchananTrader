import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/authContext'; // Import useAuth to check login status
import styles from './header.module.css';

const Header = () => {
    const {user, logout} = useAuth(); // Access user and logout from AuthContext
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Call logout to clear user session
        navigate('/login'); // Redirect to login page after logging out
    };

    return (
        <>
            <header>
                <div className={styles.headerContent}>
                    <nav className={styles.navbar}>
                        <Link to="/" className={styles.titleContainer}>
                            <h1 className={styles.title}>Buchanan Trader</h1>
                        </Link>

                        <ul className={styles.nav_links}>
                            {user ? (
                                <>
                                    <li><span onClick={handleLogout} className={styles.logoutLink}>Logout</span></li>
                                    <li><Link to="/user-profile">Profile</Link></li>
                                    <li><Link to="/user-hub">Trading Hub</Link></li>
                                </>
                            ) : (
                                <li><Link to="/login">Login</Link></li>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
