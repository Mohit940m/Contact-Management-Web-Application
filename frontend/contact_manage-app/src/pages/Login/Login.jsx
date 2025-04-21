import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, IconButton, InputAdornment, FormControl, FormHelperText } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper'; // Assuming this function exists
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(''); // General error state for backend messages
  const [isLoading, setIsLoading] = useState(false); // Loading state for button
  const navigate = useNavigate(); // React Router hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setEmailError('');
    setPasswordError('');
    setError('');

    // Validate inputs
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setPasswordError('Please enter a password.');
      return;
    }

    setIsLoading(true); // Start loading
    
    // Login API Call
    try {
      const response = await axiosInstance.post('/login', { email, password });

      if (response.data && response.data.accessToken) {
        // Store token in local storage
        localStorage.setItem('token', response.data.accessToken);

        // Navigate to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false); // End loading
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
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <FormControl fullWidth margin="normal" error={!!emailError}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText={emailError}
            />
          </FormControl>
          <FormControl fullWidth margin="normal" error={!!passwordError}>
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={passwordError}
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
          </FormControl>
          {error && (
            <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <Typography variant="body2" textAlign="center" sx={{ marginTop: 2 }}>
          Not registered yet?{' '}
          <Link to="/signUp" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Create an Account
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
