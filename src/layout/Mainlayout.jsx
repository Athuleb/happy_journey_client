import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './style.css';

function Mainlayout() {
  return (
    <div className='main-layout'>
      <nav >
        <Navbar />
      </nav>
      <div className='main-section' style={{ flexGrow: 1 }}>
          <Outlet /> 
      </div>
    </div>
  );
}

export default Mainlayout;
