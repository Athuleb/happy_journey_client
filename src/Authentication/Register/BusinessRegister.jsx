import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, CssBaseline, Grid, FormControl, FormControlLabel, Radio, RadioGroup, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import usePopup from '../../hooks/usePopup';
import instance from '../../services';


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

function BusinessRegister() {
  const [gender, setGender] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');  
  const { showSnackbar } = usePopup()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   registrationType: 'business',
    //   fullName: data.get('fullName'),
    //   company: data.get('companyName'),
    //   dob: data.get('dob'),
    //   gender: gender,
    //   mobile: data.get('mobile'),
    //   email: data.get('email'),
    //   state: data.get('state'),
    //   district: data.get('district'),
    //   pincode: data.get('pincode'),
    //   password: data.get('password'),
    // });


    const registerData = {
      user_type: 'business',
      username: data.get('fullName'),
      company: data.get('companyName'),
      dob: data.get('dob'),
      gender: gender,
      mobile: data.get('mobile'),
      email: data.get('email'),
      state: data.get('state'),
      district: data.get('district'),
      pincode: data.get('pincode'),
      password: data.get('password'),

    }

    try {
      const response = await instance.post('/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        const result = await response.json();

        if (result.responseStatus === "success") {
          setSuccessMessage('Registration successful!');
          showSnackbar({
            message: result.message, 
            open: true,
            duration: 1000,
            severity: "success",
            variant: 'filled'
          });
          navigate('/main', {
            state: {
              name: result.data
            },
          });
        } else {
          showSnackbar({
            message: result.message, 
            open: true,
            duration: 1000,
            severity: "error",
            variant: 'filled'
          });
        }
      } else {
        const errorResult = await response.json();
        setError(errorResult.message || 'Registration failed. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong. Please try again.');
      setSuccessMessage('');
    }

  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <ArrowBackIcon
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            cursor: 'pointer',
            color: 'black'


          }}
          onClick={() => navigate('/')}
        />
      </Container>
      <Container component="main" maxWidth="sm">

        <Box
          sx={{
            marginTop: 2,
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
            Business Singup
          </Typography>



          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  required
                  id="fullName"
                  label="Full Name"
                  name="fullName"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  required
                  id="companyName"
                  label="Company Name"
                  name="companyName"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  required
                  id="dob"
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    inputProps: {
                      max: new Date().toISOString().split("T")[0], 
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth margin="normal" required>
                  <Typography variant="subtitle1">Gender</Typography>
                  <RadioGroup
                    row
                    name="gender"
                    value={gender}
                    onChange={handleGenderChange}
                  >
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  required
                  id="mobile"
                  label="Mobile"
                  name="mobile"
                  type="tel"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  required
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  id="state"
                  label="State"
                  name="state"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  id="district"
                  label="District"
                  name="district"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  id="pincode"
                  label="Pincode"
                  name="pincode"
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  required
                  id="password"
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handlePasswordVisibilityToggle}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#f2e65a', color: '#000' }}
            >
              Register
            </Button>
            {error && <Typography color="error">{error}</Typography>}
            {successMessage && <Typography color="success">{successMessage}</Typography>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default BusinessRegister;
