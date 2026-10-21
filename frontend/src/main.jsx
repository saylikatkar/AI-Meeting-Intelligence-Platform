import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// Order matters: keep base first and responsive last.
import './styles/base.css'       // theme variables, reset, brand, buttons (shared)
import './styles/auth.css'       // login, register, forgot password
import './styles/app.css'        // workspace: layout, dashboards, meetings, etc.
import './styles/responsive.css' // media queries for all pages

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter><App /></BrowserRouter>
  </React.StrictMode>
)
