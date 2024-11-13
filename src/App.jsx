
import {  RouterProvider } from 'react-router-dom'
import './App.css'
import route from './router/router'
import { createTheme, ThemeProvider } from '@mui/material' 
const theme = createTheme({})
function App() {

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={route}/>
    </ThemeProvider>
  )
}

export default App
