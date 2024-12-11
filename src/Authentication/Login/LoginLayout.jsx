import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Box, Typography, duration } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import usePopup from '../../hooks/usePopup';



function LoginLayout() {
  const navigate = useNavigate();
  const [isPersonal, setIsPersonal] = useState(true);

  const ToggleLogin = (type) => {
    setIsPersonal(type);
    navigate(type ? "/login" : "/login/business-login");
  };
//   const {showSnackbar} = usePopup()
//  const handleClick = ()=>{
//   showSnackbar({
//     message:"Success",
//     open:true,
//     duration:2000,
//     severity:"success",
//     variant:"filled",
//     placement:{vertical:"bottom",horizontal:"left"}
//   })  
//  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage:'url(/loginbg.jpg)',
        backgroundSize:'cover',
        padding: 2,
      }}

    >
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
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          border: 'none',
          padding: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, color: 'black', fontSize: '3rem' }}>
          Your Journey Starts Here
        </Typography>
        <Outlet />

      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          marginTop: 4,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Button
          variant={isPersonal ? "contained" : "outlined"}

          size="large"
          sx={{
            textTransform: 'none', borderRadius: '50%',
            width: '15vh',
            backgroundColor: isPersonal ? '#e0f542' : 'white',
            color: 'black',

          }}
          onClick={() => ToggleLogin(true)}
        >
          Personal Login
        </Button>
        <Button
          variant={isPersonal ? "outlined" : "contained"}

          size="large"
          sx={{
            textTransform: 'none', borderRadius: '50%', width: '15vh',
            backgroundColor: isPersonal ? 'white' : '#e0f542',
            color: 'black',
          }}
          onClick={() => ToggleLogin(false)}
        >
          Business Login
        </Button>
        {/* <Button onClick={handleClick}>click</Button> */}
      </Box>
    </Box>
  );
}

export default LoginLayout;
