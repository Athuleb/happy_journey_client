import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, CssBaseline,Link, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import usePopup from '../../hooks/usePopup';
import axios from 'axios';


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

function BusinessLogin() {
  const navigate = useNavigate();
  const {showSnackbar} = usePopup()
  const [loading,setLoading] = useState(false)

  const handleSubmit = async(event) => {
    event.preventDefault();
    //setError('');
    setLoading(true)
    const data = new FormData(event.currentTarget);
    const loginDetails = {
      email: data.get('email'),
      password: data.get('password'),
      user_type: 'business',
    };

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      const response = await axios.post('http://127.0.0.1:8000/auth/login/', loginDetails);
      console.log('Business Login response:', response.data.user_type);
      if (response.data.status === 200) {
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
        message:`Login failed...${ errorMessage}`,
        open:true,
        duration:1000,
        severity:"error",
        variant:"filled",
      }) 
      console.error('Login failed:', error.response ? error.response.data : error.message)
    }
    finally{
      setLoading(false)
    }
 
  };

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
            Business Login
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
              type="password"
              id="password"
              autoComplete="current-password"
              variant="outlined"
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
              {loading ? <CircularProgress size={24} sx={{ color: 'black' }}/> :'Login'}
            </Button>
            <Link  href="/business-signup"
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default BusinessLogin