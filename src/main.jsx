import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material'
import theme from './theme/theme.jsx'
import PopupProvider from './Providers/PopupProvider.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <PopupProvider>
      <App />
    </PopupProvider>
  </ThemeProvider>

)
