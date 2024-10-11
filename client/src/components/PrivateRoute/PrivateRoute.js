import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import styles from './privateRoute.module.css';

const PrivateRoute = () => {
  const isAuthenticated = false; // TODO: Replace this with actual authentication logic

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
