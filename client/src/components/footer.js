import React from 'react';
import { Box, Typography, Avatar, Link, Stack, IconButton } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';
import photo from '../assets/images/ProfilePic.jpeg';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        textAlign: 'center',
        py: 4,
        mt: 'auto',
      }}
    >
      <Stack direction="column" alignItems="center" spacing={2}>
        {/* Avatar and Name */}
        <Avatar
          alt="Trevor Buchanan"
          src={photo}
          sx={{ width: 80, height: 80 }}
        />
        <Typography variant="h6">Trevor Buchanan</Typography>

        {/* Email */}
        <Typography variant="body1">
          <Link
            href="mailto:buchanan14.trevor@gmail.com"
            color="inherit"
            underline="hover"
          >
            buchanan14.trevor@gmail.com
          </Link>
        </Typography>

        {/* Social Links */}
        <Stack direction="row" spacing={2}>
          <IconButton
            href="https://github.com/your-github-username"
            target="_blank"
            aria-label="GitHub"
            sx={{ color: 'white' }}
          >
            <GitHub />
          </IconButton>
          <IconButton
            href="https://linkedin.com/in/your-linkedin-username"
            target="_blank"
            aria-label="LinkedIn"
            sx={{ color: 'white' }}
          >
            <LinkedIn />
          </IconButton>
        </Stack>
      </Stack>

      {/* Copyright */}
      <Typography variant="body2" sx={{ mt: 2 }}>
        © 2025 BuchananTrader. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
