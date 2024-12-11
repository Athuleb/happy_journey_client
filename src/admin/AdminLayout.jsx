import React from 'react'
import { Outlet } from 'react-router-dom';


function AdminLayout() {
  return (
    <div style={{width:'100%',height:'100vh',backgroundColor:'white',padding:'0px',display:'flex',alignItems:'center'}}>
      <Outlet /> 
    </div>
  )
}

export default AdminLayout