import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { user } = useAuth(); // Get authentication status from AuthContext
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    if (user !== null) {
      setLoading(false); // Once the user state is available, stop loading
    }
  }, [user]);

  // If user is null or undefined, show a loading state while the user is being checked
  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner or anything else
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
