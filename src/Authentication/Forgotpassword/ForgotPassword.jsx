import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import instance from '../../services';


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isValidUser, setIsValidUser] = useState(true);
  const navigate = useNavigate()
  const location = useLocation()
  const {user_type}   = location.state || {}
  const handleSendOtp = async () => {
    const userdetails = {
      email: email,
      username: username,
      user_type:user_type
    };
      
      
    try {
      
      const result = await instance.post('/auth/forget-password/', userdetails);
 
      if (result.data.responseStatus === 'fail') {
        setIsValidUser(false);
      } else {
        navigate('/forgot-password/validate',{ 
          state:{"email":email,"user_type":user_type}
        });
      }
    } catch (error) {
      console.error('password error', error.data.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 235, 0.986)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          padding: 4,
          boxShadow: 5,
          borderRadius: 2,
          textAlign: 'center',
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h5" mb={2}>
          Forgot Password
        </Typography>

        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />

        {!isValidUser && (
          <Typography color="error" variant="body2" mt={1}>
            Invalid email or username. Please try again.
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSendOtp}
          disabled={!email || !username}
        >
          Request OTP
        </Button>
      </Box>
    </Box>
  );
}

export default ForgotPassword;