// AuthContext.js

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser(token); // You might want to decode token to get user info
        }
    }, []);

    // Login function to handle user authentication
    const login = async (email, password) => {
        try {
            // Replace the following URL with your actual login API endpoint
            const response = await fetch('https://api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token); // Store the token in local storage
            setUser(data.user); // Assuming `data.user` contains user details
        } catch (error) {
            console.error(error);
            throw error; // Propagate the error to handle it in the Login component
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    // Registration function to handle user registration
    const register = async (email, password) => {
        try {
            // Replace the following URL with your actual registration API endpoint
            const response = await fetch('https://api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            console.log("HERE++++++++++++++");
            if (!response.ok) {
                throw new Error('Registration failed. Please try again.');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token); // Store the token in local storage
            setUser(data.user); // Assuming `data.user` contains user details
        } catch (error) {
            console.error(error);
            throw error; // Propagate the error to handle it in the Register component
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
