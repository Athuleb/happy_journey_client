import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Container, CssBaseline, Link, CircularProgress, IconButton } from '@mui/material';
import { createTheme, duration, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import usePopup from '../../hooks/usePopup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { login } from "./services"
import instance from '../../services';

//import { time } from 'console';
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

  // const { mutate, isLoading } = useMutation({
  //   mutationFn: login,
  //   onSuccess: (result) => {
  //     if (result?.responseStatus == "success") {
  //       showSnackbar({
  //         message: result.response.message,
  //         open: true,
  //         duration: 1000,
  //         severity: "success",
  //         variant: "filled",
  //       }),
  //       console.log("result", result),
  //         navigate('/main', {
  //           state: {
  //             name: result.response.data, 
  //           },
  //         });

  //     } else {
  //       console.log("message",result.response.message);

  //       showSnackbar({
  //         message: "oombi",
  //         open: true,
  //         duration: 1000,
  //         severity: "error",
  //         variant: "filled",
  //       })
  //     }
  //   }
  // })

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

    //mutate(loginDetails)

    try {

      const response = await instance.post('/auth/login/', loginDetails);
      if (response.data.responseStatus === 'success') {

        navigate('/main', {
          state: {
            name: response.data.response.data.token
          },
        });

        showSnackbar({
          message: `${response.data.response.message}`,
          open: true,
          duration: 1000,
          severity: "success",
          variant: 'filled'
        })
      };
      setLoading(true)

    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data.response.message : error.message);
      const errorMessage = error.response?.data?.response?.message || "An unexpected error occurred please try again..";
      showSnackbar({
        message: `Login failed...${errorMessage}`,
        open: true,
        duration: 1000,
        severity: "error",
        variant: "filled",
      })
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
              sx={{ color: 'black' }}
              onClick={() => navigate('/forgot-password', {
                state: { "user_type": 'personal' }
              }
              )}
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