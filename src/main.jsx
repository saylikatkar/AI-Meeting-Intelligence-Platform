import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeContext'
import App from './App.jsx'
import './styles.css'

// Login + workspace styles. Order matters: keep base first and responsive last.
import './styles/base.css'
import './styles/auth.css'
import './styles/app.css'
import './styles/responsive.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
