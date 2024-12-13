import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';



function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isValidUser, setIsValidUser] = useState(true);

  const handleSendOtp = async () => {
    console.log('OTP sent to:', email, "username :", username);
    const userdetails = {
      "email": email,
      "username": username
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/forget-password/', userdetails)
      console.log("password response", response.data.response);
      console.log("password response", response.data.message);
      if (response.data.response === 'inivalied') {
        setIsValidUser(false);
      } else {
        setOtpSent(true);
      }

    } catch (error) {
      console.error('password error', error);

    }
    setOtpSent(true);
  };

  const handleSubmit = async() => {
    const response = await axios.post('http://127.0.0.1:8000/auth/verify-otp/',{"otp":otp})
    console.log('otp response:',response.data);

  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'rgba(255, 247, 86, 0.986)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      }}
    >


      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          margin: '25vh auto',
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: 'center',
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h5" mb={2}>
          Forgot Password
        </Typography>

        {(!otpSent || !isValidUser) && (
          <>
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
              label="Enter a valid Username"
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
          </>
        )}

        {otpSent && isValidUser && (
          <>
            <TextField
              fullWidth
              label="6-digit OTP"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="number"
              inputProps={{ maxLength: 6 }}
              margin="normal"
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleSubmit}
              disabled={otp.length !== 6}
            >
              Submit
            </Button>
          </>
        )}

        <Typography variant="body2" mt={2}>
          {otpSent && isValidUser
            ? 'Enter the OTP sent to your email.'
            : 'We will send an OTP to your email address.'}
        </Typography>
      </Box>
    </Box>
  );
}

export default ForgotPassword;