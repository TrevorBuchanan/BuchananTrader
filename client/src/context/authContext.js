// src/context/authContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser } from '../api'; // Import API functions from src/api/index.js

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    // Check for a stored token when the component mounts
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Optionally decode token or fetch user info to set user state
            setUser({ token }); // Replace with decoded data if desired
        }
    }, []);

    const login = async (email, password) => {
        try {
            const data = await loginUser(email, password); // Call the API function
            localStorage.setItem('token', data.token);
            setUser({ token: data.token, ...data.user });
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please check your credentials.');
            throw error;
        }
    };

    const logout = () => {
        logoutUser(); // Call the API function to log out
        setUser(null);
    };

    const register = async (email, password) => {
        try {
            const data = await registerUser(email, password); // Call the API function
            localStorage.setItem('token', data.token);
            setUser({ token: data.token, ...data.user });
        } catch (error) {
            console.error('Registration error:', error);
            setError('Registration failed. Please try again.');
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
