import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import usePopup from '../../hooks/usePopup';
import instance from '../../services';


function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation()
  const { email } = location.state
  const { showSnackbar } = usePopup()



  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = async () => {

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const result = await instance.post('/auth/reset-password/', { "password": password, "email": email });
      if (result.data.responseStatus === 'success') {
        showSnackbar({
          message: `${result.data.message}`,
          open: true,
          duration: 1000,
          severity: "success",
          variant: 'filled'
        })
      }
      navigate('/main', {
        state: {
          name: result.data.data.username
        },
      });
    } catch (error) {
      console.error('Password reset error', error);
      setError(result.data.message);
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
          Reset Password
        </Typography>

        <TextField
          fullWidth
          label="New Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          margin="normal"
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
        <TextField
          fullWidth
          label="Confirm Password"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleResetPassword}
          disabled={!password || !confirmPassword}

        >
          Reset Password
        </Button>
      </Box>
    </Box>
  );
}

export default ResetPassword;
