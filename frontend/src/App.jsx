
import { useState } from 'react'
import './App.css'

const API_BASE = '/api/auth'

function App() {
  const [mode, setMode] = useState('login')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('meetingUser') || 'null')
    } catch {
      return null
    }
  })

  function switchMode(nextMode) {
    setMode(nextMode)
    setMessage('')
    setError('')
    setPassword('')
    setConfirmPassword('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setError('')

    if (mode === 'register' && password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    const endpoint = mode === 'register' ? 'register/' : 'login/'

    const payload =
      mode === 'register'
        ? {
            full_name: fullName.trim(),
            email: email.trim().toLowerCase(),
            password,
            confirm_password: confirmPassword,
          }
        : {
            email: email.trim().toLowerCase(),
            password,
          }

    try {
      const response = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        const details = data.error
        setError(
          Array.isArray(details)
            ? details.join(' ')
            : details || 'Something went wrong. Please try again.'
        )
        return
      }

      if (mode === 'register') {
        setMessage('Account created successfully! You can now log in.')
        setMode('login')
        setPassword('')
        setConfirmPassword('')
      } else {
        sessionStorage.setItem('meetingAccessToken', data.access)
        sessionStorage.setItem('meetingUser', JSON.stringify(data.user))
        setUser(data.user)
        setPassword('')
        setMessage('Login successful!')
      }
    } catch {
      setError(
        'Could not connect to the server. Make sure Django is running.'
      )
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    sessionStorage.removeItem('meetingAccessToken')
    sessionStorage.removeItem('meetingUser')
    setUser(null)
    setEmail('')
    setPassword('')
    setMessage('')
    setError('')
    setMode('login')
  }

  if (user) {
    return (
      <main className="auth-page">
        <section className="auth-card welcome-card">
          <div className="brand-mark">M</div>
          <p className="eyebrow">AI MEETING INTELLIGENCE</p>
          <h1>Welcome, {user.full_name || 'User'}!</h1>
          <p className="subtitle">
            You have successfully logged in.
          </p>
          <div className="user-details">
            <span>Signed in as</span>
            <strong>{user.email}</strong>
          </div>
          <p className="success-message">{message}</p>
          <button className="primary-button" onClick={logout}>
            Log out
          </button>
          <p className="note">
            Your account is connected. Meeting features can be added next.
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="brand-mark">M</div>

        <p className="eyebrow">AI MEETING INTELLIGENCE</p>

        <h1>
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h1>

        <p className="subtitle">
          {mode === 'login'
            ? 'Sign in to continue to your workspace.'
            : 'Get started with smarter meeting management.'}
        </p>

        <div className="auth-tabs">
          <button
            type="button"
            className={mode === 'login' ? 'tab active' : 'tab'}
            onClick={() => switchMode('login')}
          >
            Log in
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'tab active' : 'tab'}
            onClick={() => switchMode('register')}
          >
            Register
          </button>
        </div>

        {message && <div className="success-message">{message}</div>}
        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label>
              Full name
              <input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Enter your full name"
                maxLength={150}
                autoComplete="name"
                required
              />
            </label>
          )}

          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete={
                mode === 'login' ? 'current-password' : 'new-password'
              }
              required
            />
          </label>

          {mode === 'register' && (
            <label>
              Confirm password
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Enter your password again"
                autoComplete="new-password"
                required
              />
            </label>
          )}

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading
              ? 'Please wait...'
              : mode === 'login'
                ? 'Log in'
                : 'Create account'}
          </button>
        </form>

        <p className="note">
          {mode === 'login'
            ? "Don't have an account? Use Register above."
            : 'Already have an account? Use Log in above.'}
        </p>
      </section>
    </main>
  )
}

export default App
