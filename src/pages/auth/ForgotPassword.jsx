import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCheck } from 'lucide-react'
import { Field } from '../../components/common/Field'
import { AuthShell } from './AuthShell'

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <AuthShell>
      <div className="auth-heading">
        <span className="eyebrow">ACCOUNT RECOVERY</span>
        <h2>Reset your password</h2>
        <p>Enter your email address to continue.</p>
      </div>
      {sent ? (
        <div className="success-panel">
          <CheckCheck size={28} />
          <h3>Request received</h3>
          <p>
            If password recovery is enabled for your account, follow the instructions provided by
            your workspace administrator.
          </p>
        </div>
      ) : (
        <form
          className="auth-form"
          onSubmit={e => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <Field
            label="Email address"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button className="btn btn-primary btn-full">
            Continue <ArrowRight size={17} />
          </button>
        </form>
      )}
      <div className="auth-switch">
        <Link to="/login">
          <ArrowLeft size={14} /> Back to sign in
        </Link>
      </div>
    </AuthShell>
  )
}
