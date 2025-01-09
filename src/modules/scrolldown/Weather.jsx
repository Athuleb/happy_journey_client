import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, Alert } from '@mui/material';
import axios from 'axios';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm, WiFog } from 'weather-icons-react';
import SearchIcon from '@mui/icons-material/Search';
import WeatherIcons from './WeatherIcons';
import { Player } from '@lottiefiles/react-lottie-player';
import instance from '../../services';

;

const LottieAnimation = () => (
  <Player
    autoplay
    loop
    src="/Weatheranimathion.json"
    style={{ width: '150px', height: '150px' }}
  />
);

function Weather() {

  const [weather, setWeather] = useState({})
  const [city, setCity] = useState('');
  const findWeather = async (city) => {

    try {
      const response = await instance.post(`/weather/`, { city });
      setWeather(response.data.data);




    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather({ error: "Error fetching weather data. Please try again." });
    }
  };
  const getWeatherIcon = () => {
    const desc = weather.description ? weather.description.toLowerCase() : '';

    if (desc.includes('sun') || desc.includes('clear')) {
      return <WiDaySunny size={48} color="#FFD700" />;
    } else if (desc.includes('rain')) {
      return <WiRain size={48} color="#007BFF" />;
    } else if (desc.includes('snow')) {
      return <WiSnow size={48} color="#00BFFF" />;
    } else if (desc.includes('cloud')) {
      return <WiCloudy size={48} color="#B0C4DE" />;
    } else if (desc.includes('thunder')) {
      return <WiThunderstorm size={48} color="#FF4500" />;
    } else if (desc.includes('fog') || desc.includes('mist') || desc.includes('haze')) {
      return <WiFog size={48} color="#708090" />;
    } else {
      return <WiCloudy size={48} color="#B0C4DE" />;
    }
  };

  const getCardBackgroundColor = () => {
    const desc = weather.description ? weather.description.toLowerCase() : '';

    if (desc.includes('sun') || desc.includes('clear')) {
      return 'rgba(255, 223, 186, 0.95)';
    } else if (desc.includes('rain')) {
      return 'rgba(173, 216, 230, 0.95)';
    } else if (desc.includes('snow')) {
      return 'rgba(240, 255, 255, 0.95)';
    } else if (desc.includes('cloud')) {
      return 'rgba(220, 220, 220, 0.95)';
    } else if (desc.includes('thunder')) {
      return 'rgba(255, 235, 205, 0.95)';
    } else if (desc.includes('fog') || desc.includes('mist') || desc.includes('haze')) {
      return 'rgba(240, 240, 240, 0.95)';
    } else {
      return 'rgba(255, 247, 86, 0.95)';
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!city) {
      alert("Please enter a city name!");
      return;
    }
    getWeatherIcon(weather.description)
    findWeather(city);
  };
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: 'rgba(255, 247, 86, 0.986)',
        backgroundBlendMode: 'multiply',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 0',
        gap: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          mb: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            color: '#333',
            textTransform: 'uppercase',
            fontFamily: 'Bebas Neue, sans-serif',
            letterSpacing: '2px',
            fontSize: '4rem',
            textAlign: 'center',
          }}
        >
          Weather Forecast
        </Typography>
      </Box>

      <Box
        component="form"
        sx={{
          display: 'flex',
          gap: 2,
          mb: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 2,
          padding: 2,
          boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0px 12px 20px rgba(0, 0, 0, 0.3)',
          }
        }}
        onSubmit={handleSearch}
      >
        <TextField
          label="Enter Location"
          variant="outlined"
          sx={{ width: '300px' }}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'rgba(255, 193, 7, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(255, 193, 7, 1)',
            }
          }}
          type='submit'
        >
          <SearchIcon />
        </Button>
      </Box>



      <Card
        sx={{
          maxWidth: { xs: '100%', sm: '80%', md: 900 },
          width: '100%',
          mx: { xs: 1, sm: 2 },
          backgroundColor: getCardBackgroundColor(),
          borderRadius: 3,
          padding: { xs: '1.5rem', sm: '2rem', md: '3rem' },
          boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          transform: 'translateY(0)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0px 12px 25px rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        <CardContent sx={{
          height: 'auto'
        }}>
          {!weather.description ? <Typography variant="body1" sx={{ fontWeight: 'bold' }} color="black">Todays weather....<LottieAnimation /></Typography>
            :(
              <>
              
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.8rem',
              mb: 1,
              ':hover': {

              }
            }}
          >
            {weather.city}
          </Typography>

          {weather.description && getWeatherIcon()}
          <Typography
            sx={{
              fontSize: '1.2rem',
              fontWeight: '500',
              color: '#333'
            }}
          >
            {weather.temperature}
          </Typography>
          <Typography
            sx={{
              fontStyle: 'italic',
              fontSize: '1rem',
              my: 1,
              color: '#555'
            }}
          >
            {weather.description}
          </Typography>
          <Typography
            sx={{
              fontSize: '1rem',
              fontWeight: '400',
              color: '#444'
            }}
          >
            {weather.recommendation}
          </Typography>
          </>
            )}
          {weather.error && (
            <Alert
              severity="error"
              sx={{
                mt: 2,
                backgroundColor: 'rgba(255, 0, 0, 0.1)'
              }}
            >
              {weather.error}
            </Alert>
          )}
        </CardContent>
      </Card>
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          zIndex: 0,
          paddingLeft: '3rem'
        }}
      >
        <div key={weather.description} className="slide-anim">
          <WeatherIcons value={weather.description} />
        </div>
      </Box>

    </Box>
  );
}

export default Weather;
