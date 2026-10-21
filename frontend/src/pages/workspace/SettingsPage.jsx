import { useState } from 'react'
import { Check, Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/theme'
import { Field } from '../../components/common/Field'
import { PageHeading } from '../../components/ui/PageHeading'

export function SettingsPage({ user }) {
  const [saved, setSaved] = useState(false)
  const [name, setName] = useState(user.name)
  const { theme, setTheme } = useTheme()

  function saveProfile(e) {
    e.preventDefault()
    const session = { ...user, name }
    localStorage.setItem('meetingintel_session_v2', JSON.stringify(session))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <>
      <PageHeading
        eyebrow="PREFERENCES"
        title="Settings"
        description="Manage your local profile, appearance themes, and workspace preferences."
      />
      <div className="settings-layout">
        <section className="panel settings-panel">
          <div className="panel-heading">
            <div>
              <h2>Profile details</h2>
              <p>Changes are saved in this browser session.</p>
            </div>
          </div>
          <form className="settings-form" onSubmit={saveProfile}>
            <Field label="Full name" value={name} onChange={e => setName(e.target.value)} required />
            <Field label="Email address" value={user.email} disabled />
            <Field label="Workspace role" value={user.role} disabled />
            <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              Save changes
            </button>
            {saved && (
              <span className="success-inline">
                <Check size={15} /> Profile updated locally.
              </span>
            )}
          </form>
        </section>

        <section className="panel settings-panel">
          <div className="panel-heading">
            <div>
              <h2>Appearance & Theme</h2>
              <p>Choose between dark and light themes (matches screenshot reference)</p>
            </div>
          </div>

          <div className="theme-card-picker">
            <button
              type="button"
              className={`theme-card-option ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => setTheme('dark')}
            >
              <b>
                <Moon size={16} /> Dark Mode {theme === 'dark' && <Check size={14} style={{ marginLeft: 'auto', color: 'var(--primary-accent)' }} />}
              </b>
              <small>Deep navy & purple theme from the screenshot reference.</small>
            </button>

            <button
              type="button"
              className={`theme-card-option ${theme === 'light' ? 'active' : ''}`}
              onClick={() => setTheme('light')}
            >
              <b>
                <Sun size={16} /> Light Mode {theme === 'light' && <Check size={14} style={{ marginLeft: 'auto', color: 'var(--primary-accent)' }} />}
              </b>
              <small>Crisp, clean high-contrast light theme.</small>
            </button>
          </div>

          <div className="settings-option">
            <span>
              <b>Account preferences</b>
              <small>Manage your profile and workspace preferences.</small>
            </span>
            <span className="small-pill">Enabled</span>
          </div>
          <div className="settings-option">
            <span>
              <b>Workspace sync</b>
              <small>Workspace synchronization settings.</small>
            </span>
            <span className="small-pill muted-pill">Not connected</span>
          </div>
          <div className="settings-option">
            <span>
              <b>AI meeting analysis</b>
              <small>Meeting analysis settings.</small>
            </span>
            <span className="small-pill muted-pill">Not connected</span>
          </div>
        </section>
      </div>
    </>
  )
}
