import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Link,
  Stack,
} from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Form validation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      await register(email, password);
      setSnackbar({ open: true, message: 'Registration successful! Please log in.', severity: 'success' });
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
      setSnackbar({ open: true, message: 'Registration failed. Please try again.', severity: 'error' });
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
        onSubmit={handleRegister}
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
          Register
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            error={!!error && error.includes('email')}
            helperText={error.includes('email') ? 'Invalid email address.' : ''}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            error={!!error && error.includes('Passwords')}
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
            error={!!error && error.includes('Passwords')}
            helperText={error.includes('Passwords') ? 'Passwords do not match.' : ''}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ py: 1.5 }}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </Stack>

        <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link
            component="button"
            onClick={() => navigate('/login')}
            sx={{ cursor: 'pointer', textDecoration: 'none' }}
          >
            Click here to log in.
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

export default Register;
