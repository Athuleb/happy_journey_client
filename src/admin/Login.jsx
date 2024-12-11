import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
        setError('Please fill in both fields');
    } else if (email === 'athul@gmail.com' && password === 'athul') {
        setError('');
        navigate('/admin');
    } else {
        setError('Invalid credentials');
    }
};



  
  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
          boxShadow: 3,
          borderRadius: 2
        }}
      >
        <Typography variant="h5" gutterBottom>Login</Typography>
        
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            type="email"
            required
          />
          
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            type="password"
            required
          />
          
          {error && (
            <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          
          <Button 
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form> 
        <Grid container justifyContent="flex-end" sx={{ mt: 1 }}>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
