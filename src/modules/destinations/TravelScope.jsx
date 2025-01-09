import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, styled, keyframes, CircularProgress } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import axios from 'axios';
import car from '/icons/car.png';
import instance from '../../services';

function TravelScope() {
  const [formData, setFormData] = useState({
    from: '',
    to: ''
  });
  const [respData, setRespData] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  const [Loading, setLoading] = useState(false);

  const fadeInSlideUp = keyframes`
    0% {
      width: 0;
      opacity: 0;
      transform: translateX(-100%);
    }
    50% {
      opacity: 1;
    }
    100% {
      width: 100%;
      transform: translateX(0); 
    }
  `;
  
  const carFade = keyframes`
    0% { opacity: 1; transform: translateX(-100%); }
    100% { opacity: 0; transform: translateX(100%); } 
  `;

  const DistanceDisplay = styled(Box)(({ theme }) => ({
    animation: `${fadeInSlideUp} 3s steps(40, end) forwards`,
    color: '#333',
    padding: '1rem',
    height: '3vh',
    overflow: 'hidden',
    borderRadius: '8px',
    marginTop: '1.5rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    display: 'flex',
    placeContent: 'center',
    marginLeft: '30vh',
  }));

  const CarAnimation = styled(Box)({
    animation: `${carFade} 2s ease-in-out forwards`,
    display: 'flex',
    alignItems: 'center',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await instance.post('/distance/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setRespData(response.data);
      setShowAnimation(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '5vh',
      }}
    >
      <Container
        maxWidth="sm"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom style={{ color: '#ff6f61', fontWeight: 'bold' }}>
          Discover Your Path with TravelScope
        </Typography>
        <Typography variant="body1" gutterBottom style={{ color: '#333' }}>
          Short and direct, encouraging users to find their route with ease
        </Typography>

        <Box component="form" sx={{ mt: 2 }} method="post" onSubmit={handleSubmit}>
          <TextField
            label="Starting"
            variant="outlined"
            fullWidth
            margin="normal"
            name="from"
            value={formData.from}
            onChange={handleInput}
            InputProps={{ style: { backgroundColor: '#fff', borderRadius: '8px' } }}
          />
          <TextField
            label="Destination"
            variant="outlined"
            fullWidth
            margin="normal"
            name="to"
            value={formData.to}
            onChange={handleInput}
            InputProps={{ style: { backgroundColor: '#fff', borderRadius: '8px' } }}
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            style={{ marginTop: '1rem', backgroundColor: 'white', color: '#fff', padding: '0.8rem', borderRadius: '8px', width: '5vh' }}
          >
            <TravelExploreIcon sx={{ color: 'gray' }} />
          </Button>
        </Box>
      </Container>


      {Loading && (
        <CircularProgress
          sx={{
            color: '#fafa43',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          }}
          size={60}
          thickness={4}
        />
      )}

      {respData.distance && showAnimation && !Loading && (
        <div style={{ display: 'flex', flexDirection: 'row', placeContent: 'center', width: '100%' }}>
          <DistanceDisplay>
            From {respData.start} to {respData.ends} have {parseFloat(respData.distance).toFixed(1)} km
          </DistanceDisplay>
          <CarAnimation>
            <img src={car} alt="" style={{ width: '300px' }} />
          </CarAnimation>
        </div>
      )}
    </div>
  );
}

export default TravelScope;
