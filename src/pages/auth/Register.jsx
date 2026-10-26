
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, UserRound } from 'lucide-react'
import { auth } from '../../auth'
import { Field } from '../../components/common/Field'
import { AuthShell } from './AuthShell'

export function Register({ onLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setError('')

    if (name.trim().length < 2) {
      setError('Please enter your full name.')
      return
    }

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    if (password.length < 8) {
      setError('Use at least 8 characters for your password.')
      return
    }

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const user = await auth.register({
        name,
        email,
        password,
        confirm_password: confirm,
      })

      onLogin?.(user)
      navigate('/app')
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell>
      <div className="auth-heading">
        <span className="eyebrow">GET STARTED</span>
        <h2>Create your account</h2>
        <p>Build clarity from every conversation.</p>
      </div>

      <form className="auth-form" onSubmit={submit}>
        <Field
          label="Full name"
          placeholder="Your full name"
          autoComplete="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Field
          label="Work email"
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
              placeholder="At least 8 characters"
              autoComplete="new-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="text-action"
              onClick={() => setShow(previous => !previous)}
            >
              {show ? 'Hide' : 'Show'}
            </button>
          </div>
        </label>

        <Field
          label="Confirm password"
          type="password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
        />

        <div className="member-role-note">
          <UserRound size={16} />
          <span>
            New accounts start with the <b>Member</b> role.
            Manager and Admin access must be assigned by an
            authorized administrator.
          </span>
        </div>

        {error && (
          <div className="form-error" role="alert">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={loading}
        >
          {loading ? (
            'Creating account...'
          ) : (
            <>
              Create account <ArrowRight size={17} />
            </>
          )}
        </button>
      </form>

      <div className="auth-switch">
        Already have an account? <Link to="/login">Sign in</Link>
      </div>
    </AuthShell>
  )
}
