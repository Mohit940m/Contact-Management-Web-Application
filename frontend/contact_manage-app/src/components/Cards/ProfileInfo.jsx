import React from 'react';
import { Avatar, Box, Typography, Button } from '@mui/material';

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: '8px 16px',
        backgroundColor: '#f5f5f5',
        borderRadius: '12px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      }}
    >
      <Avatar>
        {userInfo?.fullName?.charAt(0).toUpperCase()}
      </Avatar>
      <Box>
        <Typography variant="subtitle1" fontWeight="600">
          {userInfo?.fullName || 'Guest User'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {userInfo?.email || 'guest@example.com'}
        </Typography>
      </Box>
      <Button
        onClick={onLogout}
        variant="outlined"
        color="error"
        size="small"
        sx={{
          marginLeft: 'auto',
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: '8px',
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default ProfileInfo;
