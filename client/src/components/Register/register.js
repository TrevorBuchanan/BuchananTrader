// register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

import styles from './register.module.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useAuth(); // Get the register function from context
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await register(email, password); // Call your register function
      navigate('/login'); // Redirect after successful registration
    } catch (error) {
      console.error("Registration failed:", error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className={styles.pageContent}>
      <div className={styles.registerContent}>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            className={styles.registerInput}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className={styles.registerInput}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input
            className={styles.registerInput}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <button className={styles.registerButton} type="submit">Register</button>
        </form>
        <p>
          Already have an account? <span className={styles.pageLink} onClick={() => navigate('/login')}>Click here to login.</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
