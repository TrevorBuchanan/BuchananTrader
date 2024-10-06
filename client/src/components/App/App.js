import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import UserProfile from '../UserProfile/UserProfile';
import AdminProfile from '../AdminProfile/AdminProfile';
import UserHub from '../UserHub/UserHub';
import AdminHub from '../AdminHub/AdminHub';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound'
import PrivateRoute from '../PrivateRoute/PrivateRoute';

import styles from './App.module.css';

function App() {
  return (
    <div className="mainContent">
      <Router>
        <Header />  { }

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Use the PrivateRoute wrapper here */}
            <Route element={<PrivateRoute />}>
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/admin-profile" element={<AdminProfile />} />
              <Route path="/user-hub" element={<UserHub />} />
              <Route path="/admin-hub" element={<AdminHub />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} /> {/* 404 Not Found page */}
          </Routes>
        </main>

        <Footer />  {/* Include the Footer */}
      </Router>
    </div>
  );
}

export default App;
