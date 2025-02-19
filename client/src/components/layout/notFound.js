import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" color="error" gutterBottom>
          404 - Not Found
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 3 }}>
          The page you are looking for does not exist. It might have been moved or deleted.
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{ mt: 2 }}
      >
        Go Back to Home
      </Button>
    </Container>
  );
};

export default NotFound;
