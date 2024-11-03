// privateRoute.js

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { user } = useAuth(); // Get authentication status from AuthContext

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
