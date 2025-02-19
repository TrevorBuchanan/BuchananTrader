import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Store form validation errors
  const [loading, setLoading] = useState(false); // Track loading state
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' }); // Snackbar state

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic form validation
    if (!email || !password) {
      setError('Email and password are required.');
      setLoading(false);
      return;
    }

    try {
      await login(email, password);
      setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
      navigate('/user-profile');
    } catch (err) {
      console.error("Login failed:", err);
      setSnackbar({ open: true, message: 'Login failed. Please check your credentials.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        backgroundColor: 'background.default',
        px: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          Log In
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            error={!!error} // Show error styling
            helperText={error && "Please enter a valid email and password."} // Display error message
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            error={!!error}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading} // Disable button while loading
            sx={{ py: 1.5 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Stack>

        <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
          New user?{' '}
          <Link
            component="button"
            onClick={() => navigate('/register')}
            sx={{ cursor: 'pointer', textDecoration: 'none' }}
          >
            Click here to register.
          </Link>
        </Typography>
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
