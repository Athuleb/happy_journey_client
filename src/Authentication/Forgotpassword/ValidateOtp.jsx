import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import usePopup from '../../hooks/usePopup';
import instance from '../../services';

function ValidateOTP() {
  const [otp, setOtp] = useState('');
  const [isOtpValid, setIsOtpValid] = useState(true);
  const location = useLocation()
  const {email,user_type}   = location.state || {}
  const navigate = useNavigate();
  const {showSnackbar} = usePopup()
  const handleValidateOtp = async () => {

    

    try {
      const result = await instance.post('/auth/validate-otp/', { otp:otp,email:email,user_type:user_type });
      
      
      if (result.data.responseStatus === 'success') {
       navigate('/forgot-password/reset-password',{state:{"email":result.data.data,"user_type":user_type}}); 
             showSnackbar({
               message: `${result.data.message}`,
               open: true,
               duration: 1000,
               severity: "success", 
               variant: 'filled'
           })
      
      } else {
        setIsOtpValid(false);
      }
    } catch (error) {
      console.error('OTP validation error', error);
      setIsOtpValid(false);
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
          Validate OTP
        </Typography>

        <TextField
          fullWidth
          label="Enter OTP"
          variant="outlined"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          type="text"
          margin="normal"
        />

        {!isOtpValid && (
          <Typography color="error" variant="body2" mt={1}>
            Invalid OTP. Please try again.
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleValidateOtp}
          disabled={!otp}
        >
          Validate OTP
        </Button>
      </Box>
    </Box>
  );
}

export default ValidateOTP;
