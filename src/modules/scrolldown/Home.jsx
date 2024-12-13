import React from 'react';
import { Button, Typography, Box, Container, Grid } from '@mui/material';
import bg from '/bg.jpg';
import bd from '/BeautifulDestinations.jpg'
import './style.css';
import packages from '/Packages.jpeg'
import per from '/per.jpeg'
import longbg from '/longbg.jpg'
import { useLocation, useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate()
  const location = useLocation();
  const { name } = location.state || {}; 
  const uppername = name.charAt(0).toUpperCase() + name.slice(1);
console.log('name>>',uppername);

  return (
    <div>
      <div style={{ position: 'relative', width: '100%', height: '80vh', paddingTop: '5.5rem', color: 'black' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1,
            opacity: 0.5,
          }}
        />

        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2, fontSize: { xs: '1.5rem', md: '2.5rem' } }}>
          Welcome {uppername ? uppername : ''} to Happy Journey
          </Typography>

          <Typography variant="h6" sx={{ textAlign: 'center', maxWidth: '600px', mb: 4 }}>
            Discover unforgettable experiences, explore top destinations, and start planning your next adventure with us.
          </Typography>
          <Button variant="contained" sx={{ backgroundColor: '#fad05c',width:'20vh' ,height:'5vh',color:'black',fontWeight:'bold' }} onClick={()=>navigate('/main/explore')}>
            Explore Now
          </Button>
        </Box>
      </div>

      <Container sx={{ my: 6 }}>

        <div className="typing-wrapper">
          <Typography className="typing" variant="h4" sx={{ mb: 4 }}>
            Why Choose Us
          </Typography>
        </div>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <img className='animate-img' src={packages} alt="Feature 1" style={{ width: '90%', borderRadius: '10px' }} />
              <Typography variant="h6" sx={{ mt: 2 }}>Affordable Packages</Typography>
              <Typography>Enjoy the best trips without breaking the bank.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <img className='animate-img' src={bd} alt="Feature 2" style={{ width: '90%', borderRadius: '10px' }} />
              <Typography variant="h6" sx={{ mt: 2 }}>Beautiful Destinations</Typography>
              <Typography>Handpicked destinations for a memorable journey.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <img className='animate-img' src={per} alt="Feature 3" style={{ width: '90%', borderRadius: '10px' }} />
              <Typography variant="h6" sx={{ mt: 2 }}>Personalized Itineraries</Typography>
              <Typography>Custom trips designed for every travel style.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>


      <Box className='Call-to-Action' sx={{
        backgroundImage: `url(${longbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: 6,
        width: '100%',
        height: '30vh',
      }}>
        <Container sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 2 }}>Start Your Adventure Today</Typography>
          <Typography sx={{ mb: 4 }}>Book your next trip with us and experience the journey of a lifetime.</Typography>
          <Button variant="contained" color="primary" href="#contact">
            Get in Touch
          </Button>
        </Container>
      </Box>
    </div>
  );
}

export default Home;
