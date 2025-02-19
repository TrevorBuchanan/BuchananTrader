import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
} from '@mui/material';

const UserProfile = () => {
  const [email, setEmail] = useState('user@example.com'); // Replace with actual email from user context
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [preferences, setPreferences] = useState({
    receiveEmails: true,
    darkMode: false,
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const handleSavePassword = () => {
    if (!password || !newPassword) {
      setSnackbar({
        open: true,
        message: 'Both fields are required to update the password.',
        severity: 'error',
      });
      return;
    }

    // Add API call or logic to update the password
    console.log('Password updated:', { oldPassword: password, newPassword });
    setSnackbar({
      open: true,
      message: 'Password updated successfully!',
      severity: 'success',
    });
    setPassword('');
    setNewPassword('');
  };

  const handlePreferencesChange = (key) => (event) => {
    setPreferences((prev) => ({ ...prev, [key]: event.target.checked }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        my: 4,
        px: 3,
        py: 4,
        backgroundColor: 'background.paper',
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        User Profile
      </Typography>

      {/* Account Information */}
      <Typography variant="h6" component="h2" gutterBottom>
        Account Information
      </Typography>
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Email"
          value={email}
          fullWidth
          disabled
          sx={{ mb: 2 }}
        />
        <Typography variant="body2" color="textSecondary">
          Your email address cannot be changed.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Password Update */}
      <Typography variant="h6" component="h2" gutterBottom>
        Update Password
      </Typography>
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Current Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSavePassword}
          sx={{ mt: 2 }}
        >
          Save Password
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Preferences */}
      <Typography variant="h6" component="h2" gutterBottom>
        Preferences
      </Typography>
      <Box>
        <FormControlLabel
          control={
            <Switch
              checked={preferences.receiveEmails}
              onChange={handlePreferencesChange('receiveEmails')}
            />
          }
          label="Receive update emails"
        />
        <FormControlLabel
          control={
            <Switch
              checked={preferences.darkMode}
              onChange={handlePreferencesChange('darkMode')}
            />
          }
          label="Enable dark mode"
        />
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

export default UserProfile;
