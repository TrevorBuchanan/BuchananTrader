// login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import styles from './login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/user-profile');
    } catch (error) {
      console.error("Login failed:", error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className={styles.pageContent}>
      <div className={styles.loginContent}>
        <h2>Log In</h2>
        <form onSubmit={handleLogin}>
          <input
            className={styles.loginInput}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <br></br>
          <input
            className={styles.loginInput}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <br></br>
          <button className={styles.loginButton} type="submit">Login</button>
        </form>
        <p>
          New user? <span className={styles.pageLink} onClick={() => navigate('/register')}>Click here to register.</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
