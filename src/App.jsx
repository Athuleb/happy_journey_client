
import {  RouterProvider } from 'react-router-dom'
import './App.css'
import route from './router/router'
import { createTheme, ThemeProvider } from '@mui/material' 
const theme = createTheme({})
function App() {

  return (
      <RouterProvider router={route}/>
  )
}

export default App
