// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import Home from '../Home/home';
import UserProfile from '../UserProfile/userProfile';
import UserHub from '../UserHub/userHub';
import Login from '../Login/login';
import Register from '../Register/register';
import NotFound from '../NotFound/notFound';
import PrivateRoute from '../privateRoute';
import { AuthProvider } from '../../context/AuthContext';

import styles from './App.module.css';

function App() {
  return (
    <AuthProvider> {/* Provide authentication context to the entire app */}
      <Router>
        <Header /> 

        <main className>
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Wrap all protected routes inside PrivateRoute */}
            <Route element={<PrivateRoute />}>
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/user-hub" element={<UserHub />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} /> {/* 404 Not Found page */}
          </Routes>
        </main>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
