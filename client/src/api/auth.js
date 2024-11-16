// src/api/auth.js
import axios from 'axios';

const API_URL = '/api'; // Or your actual backend URL

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
        }, {
            headers: { 'Content-Type': 'application/json' },
        });

        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        return response.data;  // Return the token and user data

    } catch (err) {
        console.error('Login failed:', err.message);
        throw new Error('Login failed. Please check your credentials.');
    }
};

export const registerUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            email,
            password,
        }, {
            headers: { 'Content-Type': 'application/json' },
        });

        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        return response.data;  // Return the token and user data

    } catch (err) {
        console.error('Registration failed:', err.message);
        throw new Error('Registration failed. Please try again.');
    }
};

export const logoutUser = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
};
