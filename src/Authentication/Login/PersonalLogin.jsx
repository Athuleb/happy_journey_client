import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Container, CssBaseline, Link, CircularProgress, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import usePopup from '../../hooks/usePopup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
const theme = createTheme({
  palette: {
    primary: {
      main: '#f2e65a',
    },
    secondary: {
      main: '#d0fc7e',
    },
  },
});



function PersonalLogin() {
  const navigate = useNavigate();
  const { showSnackbar } = usePopup();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const handleForgotPassword = async (event) => {
    // const data = new FormData(event.currentTarget);
    // email = data.get('email')
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/forget-password/')
      console.log("password response", response.data);

    } catch (error) {
      console.error('password error', error);

    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    //setError('');
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const loginDetails = {
      email: data.get('email'),
      password: data.get('password'),
      user_type: 'personal',
    };



    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await axios.post('http://127.0.0.1:8000/auth/login/', loginDetails);
      console.log('Login response:', response.data);
      if (response.data.message === 'Login successful') {
        navigate('/main', {
          state: {
            name: response.data.user
          },
        });
      }

    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : "An unexpected error occurred please try again..";
      showSnackbar({
        message: `Login failed...${errorMessage}`,
        open: true,
        duration: 1000,
        severity: "error",
        variant: "filled",
      })
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
    finally {
      setLoading(false);
    }
  };

  const handlePasswordVisibilityToggle = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 3,
            padding: 4,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
            Personal Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              variant="outlined"
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordVisibilityToggle}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"

              sx={{
                mt: 3,
                mb: 2,
                background: 'linear-gradient(to right, #f2e65a, #d0fc7e)',
                color: '#000',
                '&:hover': {
                  background: 'linear-gradient(to right, #d0fc7e, #f2e65a)',
                },
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'black' }} /> : 'Login'}

            </Button>
            <Link href="/person-signup"
              sx={{
                display: 'block',
                textAlign: 'center',
                marginTop: 2,
                color: 'black',
                textDecorationLine: 'none',
                '&:hover': {
                  cursor: 'pointer',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',

                }
              }}
            >  Don't have an account? Sign up here
            </Link>
            <Button
              variant="text"
              size="large"
              sx={{ color: 'black', marginTop: 2 }}
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password
            </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default PersonalLogin