import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Box } from '@mui/material';

function Mainlayout() {

  const location = useLocation()
  const isSearchPage = location.pathname.includes("/search")

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',  // Ensure the full height of the viewport is used
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(255, 247, 86, 0.986)',
        color: 'black',
        overflow: 'hidden', // Prevent unnecessary scrolling
      }}
    >
      {/* Conditionally render the Navbar only if not on the search page */}
      {!isSearchPage && (
        <Box component="nav" sx={{ width: '100%' }}>
          <Navbar />
        </Box>
      )}
      
      <Box
        className="main-section"
        sx={{
          flexGrow: 1,
          width: '100%',
          overflowX: 'hidden',  // Prevent horizontal scrolling
          overflowY: 'auto',  // Allow vertical scrolling if necessary
          padding: { xs: '1rem', sm: '2rem', md: '3rem' }, // Responsive padding
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Mainlayout;
