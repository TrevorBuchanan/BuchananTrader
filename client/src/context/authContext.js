import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser } from '../api'; // Import API functions
import { fetchUserDetails } from '../api'; // Import the function to fetch user data

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const userData = await fetchUserDetails(token); // Fetch user data from API
      setUser({
        token,
        ...userData, // Merge token and user details
      });
    } catch (err) {
      console.error('Failed to fetch user data:', err);
      setError('Failed to fetch user data. Please log in again.');
      setUser(null); // Clear user state if fetching fails
    }
  };

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password); // Call the API function
      localStorage.setItem('token', data.token);

      // Fetch user data immediately after login
      fetchUserData(data.token);
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials.');
      throw error;
    }
  };

  const logout = () => {
    logoutUser(); // Call the API function to log out
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (email, password) => {
    try {
      const data = await registerUser(email, password); // Call the API function
      localStorage.setItem('token', data.token);

      // Fetch user data immediately after registration
      fetchUserData(data.token);
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
