import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  FormControl,
  FormHelperText,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance'; // Your custom Axios instance
import { validateEmail } from '../../utils/helper'; // Ensure this function is implemented

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // Hook to navigate between routes

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setFullNameError('');
    setEmailError('');
    setPasswordError('');
    setError('');

    // Validate full name
    if (!fullName) {
      setFullNameError('Please enter your full name.');
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    // Validate password
    if (!password) {
      setPasswordError('Please enter a password.');
      return;
    }

    try {
      const response = await axiosInstance.post('/create-account', {
        fullName,
        email,
        password,
      });

      if (response.data && response.data.accessToken) {
        // On successful registration, redirect to a relevant page
        navigate('/dashboard'); // Or redirect to login if required
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" textAlign="center" marginBottom={2}>
          Sign Up
        </Typography>
        {error && (
          <Typography color="error" textAlign="center" marginBottom={2}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSignUp}>
          <FormControl fullWidth margin="normal" error={!!fullNameError}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <FormHelperText sx={{ color: 'error.main' }}>{fullNameError}</FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="normal" error={!!emailError}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormHelperText sx={{ color: 'error.main' }}>{emailError}</FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="normal" error={!!passwordError}>
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText sx={{ color: 'error.main' }}>{passwordError}</FormHelperText>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" textAlign="center" sx={{ marginTop: 2 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignUp;
