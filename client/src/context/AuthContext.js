// AuthContext.js

import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';

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
            const response = await axios.post('/api/login', {
                email,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data; 
            localStorage.setItem('token', data.token); 
            setUser({ token: data.token, ...data.user }); 
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please check your credentials.'); // Set error message
            throw error; 
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const register = async (email, password) => {
        try {
            const response = await axios.post('/api/register', {
                email,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data; 
            localStorage.setItem('token', data.token); 
            setUser({ token: data.token, ...data.user }); 
        } catch (error) {
            console.error('Registration error:', error);
            setError('Registration failed. Please try again.'); // Set error message
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
