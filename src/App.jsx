import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { auth } from './auth'
import { seedMeetings } from './data'

import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage'
import HowItWorksPage from './pages/HowItWorksPage'
import AboutUsPage from './pages/AboutUsPage'
import PricingPage from './pages/PricingPage'

import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { ForgotPassword } from './pages/auth/ForgotPassword'
import { Protected } from './routes/Protected'
import { Workspace } from './routes/Workspace'

// Paths handled by <Workspace /> (it picks the page from location.pathname).
const WORKSPACE_PATHS = [
  '/app', '/meetings', '/upload', '/actions', '/analytics',
  '/calendar', '/compare', '/users', '/settings', '/meeting/:id',
]

/**
 * Root App — only responsible for routing.
 * Public pages live in src/pages/, auth in src/pages/auth/,
 * and the signed-in workspace in src/routes/Workspace.jsx.
 */
export default function App() {
  const [user, setUser] = useState(() => auth.current())
  const [meetings, setMeetings] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem('meetingintel_meetings_v1') ||
          localStorage.getItem('meetmind_meetings_v1') ||
          'null'
        ) || seedMeetings
      )
    } catch {
      return seedMeetings
    }
  })

  useEffect(() => {
    localStorage.setItem('meetingintel_meetings_v1', JSON.stringify(meetings))
  }, [meetings])

  function logout() {
    auth.logout()
    setUser(null)
  }

  const workspace = (
    <Protected user={user}>
      <Workspace user={user} onLogout={logout} meetings={meetings} setMeetings={setMeetings} />
    </Protected>
  )

  return (
    <Routes>
      {/* Public pages */}
      <Route path="/"              element={<HomePage />} />
      <Route path="/features"      element={<FeaturesPage />} />
      <Route path="/how-it-works"  element={<HowItWorksPage />} />
      <Route path="/about"         element={<AboutUsPage />} />
      <Route path="/pricing"       element={<PricingPage />} />

      {/* Auth pages — only "Remember me" sessions skip the sign-in form */}
      <Route
        path="/login"
        element={user?.remember ? <Navigate to="/app" replace /> : <Login onLogin={setUser} />}
      />
      <Route
        path="/register"
        element={user?.remember ? <Navigate to="/app" replace /> : <Register onLogin={setUser} />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Signed-in workspace */}
      {WORKSPACE_PATHS.map(path => (
        <Route key={path} path={path} element={workspace} />
      ))}

      {/* Catch-all → home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
