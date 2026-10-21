import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Check, ShieldCheck, UserRound, Users } from 'lucide-react'
import { auth } from '../../auth'
import { Field } from '../../components/common/Field'
import { AuthShell } from './AuthShell'

export function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Member')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password) return setError('Enter your email and password to continue.')
    setLoading(true)
    try {
      const user = await auth.login({ email, password, role })
      onLogin(user)
      navigate('/app')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell>
      <div className="auth-heading">
        <span className="eyebrow">WELCOME BACK</span>
        <h2>Sign in to MeetingIntel</h2>
        <p>Pick your account role and continue to your workspace.</p>
      </div>
      <form onSubmit={submit} className="auth-form">
        <div className="role-label">
          <span>Sign in as</span>
          <span className="secure-note">
            <ShieldCheck size={13} /> Role-based workspace
          </span>
        </div>
        <div className="role-picker">
          {['Member', 'Manager', 'Admin'].map((r, i) => (
            <button
              type="button"
              key={r}
              onClick={() => {
                setRole(r)
                setError('')
              }}
              className={`role-option ${role === r ? 'selected' : ''}`}
            >
              <span className="role-symbol">
                {i === 0 ? <UserRound size={17} /> : i === 1 ? <Users size={17} /> : <ShieldCheck size={17} />}
              </span>
              <span>{r}</span>
              {role === r && <Check size={14} className="role-check" />}
            </button>
          ))}
        </div>
        <Field
          label="Email address"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label className="field">
          <span>Password</span>
          <div className="password-wrap">
            <input
              type={show ? 'text' : 'password'}
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="button" className="text-action" onClick={() => setShow(!show)}>
              {show ? 'Hide' : 'Show'}
            </button>
          </div>
        </label>
        <div className="form-between">
          <label className="check-label">
            <input type="checkbox" /> Remember me
          </label>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        {error && (
          <div className="form-error" role="alert">
            {error}
          </div>
        )}
        <button className="btn btn-primary btn-full" disabled={loading}>
          {loading ? 'Signing in…' : `Sign in as ${role}`} <ArrowRight size={17} />
        </button>

      </form>
      <div className="auth-switch">
        New to MeetingIntel? <Link to="/register">Create an account</Link>
      </div>
    </AuthShell>
  )
}
