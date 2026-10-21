import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { auth } from './auth'
import { seedMeetings } from './data'
import { ThemeProvider } from './context/ThemeContext'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { ForgotPassword } from './pages/auth/ForgotPassword'
import { Protected } from './routes/Protected'
import { Workspace } from './routes/Workspace'

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

  return (
    <ThemeProvider>
      <Routes>
        {/* Home: send logged-in users to their workspace, everyone else to login */}
        <Route path="/" element={<Navigate to={user ? '/app' : '/login'} replace />} />

        {/* Auth routes */}
        <Route
          path="/login"
          element={user ? <Navigate to="/app" replace /> : <Login onLogin={setUser} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/app" replace /> : <Register onLogin={setUser} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Authenticated Workspace routes */}
        <Route
          path="*"
          element={
            <Protected user={user}>
              <Workspace
                user={user}
                onLogout={logout}
                meetings={meetings}
                setMeetings={setMeetings}
              />
            </Protected>
          }
        />
      </Routes>
    </ThemeProvider>
  )
}
