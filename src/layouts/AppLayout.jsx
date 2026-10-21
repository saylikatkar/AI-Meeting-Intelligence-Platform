import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Activity, ArrowRight, Bell, CalendarDays, Check, CheckCheck, ChevronDown, FileText, LayoutDashboard, ListTodo, LogOut, Menu, Settings, Upload, UserRound, Users, X, Zap } from 'lucide-react'
import { seedActions, seedMeetings } from '../data'
import { Brand } from '../components/common/Brand'
import { initials } from '../utils/helpers'

export const navFor = {
  Member: [
    {
      label: 'Workspace',
      items: [
        ['Overview', '/app', LayoutDashboard],
        ['My meetings', '/meetings', FileText],
        ['Upload meeting', '/upload', Upload],
        ['Action items', '/actions', ListTodo],
        ['Calendar', '/calendar', CalendarDays],
        ['Compare meetings', '/compare', Activity]
      ]
    }
  ],
  Manager: [
    {
      label: 'TEAM WORKSPACE',
      items: [
        ['Overview', '/app', LayoutDashboard],
        ['Team meetings', '/meetings', FileText],
        ['Action items', '/actions', ListTodo],
        ['Calendar', '/calendar', CalendarDays],
        ['Compare meetings', '/compare', Activity],
        ['Team analytics', '/analytics', Activity]
      ]
    }
  ],
  Admin: [
    {
      label: 'ADMINISTRATION',
      items: [
        ['Overview', '/app', LayoutDashboard],
        ['User management', '/users', Users],
        ['All meetings', '/meetings', FileText],
        ['Analytics', '/analytics', Activity],
        ['Calendar', '/calendar', CalendarDays],
        ['Compare meetings', '/compare', Activity],
        ['System settings', '/settings', Settings]
      ]
    }
  ]
}

export function AppLayout({ user, onLogout, children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notice, setNotice] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [sideProfileOpen, setSideProfileOpen] = useState(false)
  const [plansOpen, setPlansOpen] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()
  const nav = navFor[user.role] || navFor.Member

  const title =
    nav.flatMap(g => g.items).find(i => i[1] === location.pathname)?.[0] ||
    (location.pathname.startsWith('/meeting/') ? 'Meeting details' : 'Workspace')

  const [meetings] = useState(() => {
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

  const actionItems = (() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem('meetingintel_actions') ||
          localStorage.getItem('meetmind_actions') ||
          'null'
        ) || seedActions
      )
    } catch {
      return seedActions
    }
  })()

  const notifications = [
    ...actionItems
      .filter(i => i.status !== 'Completed')
      .slice(0, 3)
      .map(i => ({ text: `Action item: ${i.task}`, kind: 'task' })),
    ...meetings
      .filter(m => m.status === 'Processing')
      .slice(0, 2)
      .map(m => ({ text: `${m.title} is waiting for processing`, kind: 'meeting' })),
    ...meetings
      .filter(m => m.status === 'Completed' && m.summary && !m.summary.includes('unavailable'))
      .slice(0, 2)
      .map(m => ({ text: `Summary available: ${m.title}`, kind: 'summary' }))
  ]

  return (
    <div className="app-shell">
      {/* SIDEBAR */}
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <Brand />
          <button className="icon-btn mobile-close" onClick={() => setMobileOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="workspace-select" aria-label="Workspace">
          <span className="workspace-logo">M</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <b style={{ fontSize: 12, color: 'var(--ink-heading)' }}>MeetingIntel Workspace</b>
            <small style={{ fontSize: 10, color: 'var(--muted)' }}>{user.role} tier</small>
          </div>
        </div>

        <div className="sidebar-nav">
          {nav.map(group => (
            <div className="nav-group" key={group.label}>
              <div className="nav-caption">{group.label}</div>
              {group.items.map(([label, path, Icon]) => (
                <Link
                  key={path + label}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={`nav-link ${location.pathname === path ? 'active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                  {label === 'Action items' && (
                    <span className="nav-count">
                      {actionItems.filter(i => i.status !== 'Completed').length}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="sidebar-bottom">
          <div className="quota-card">
            <div className="quota-title">
              <Zap size={15} />
              <span>Workspace usage</span>
            </div>
            <div className="quota-numbers">
              <b>2 of 5</b>
              <span>meetings this month</span>
            </div>
            <div className="quota-track">
              <span />
            </div>
            <small>Free plan · sample usage</small>
            <button className="plans-link" onClick={() => setPlansOpen(true)}>
              View Plans <ArrowRight size={13} />
            </button>
          </div>

          <Link className="nav-link" to="/settings">
            <Settings size={18} />
            <span>Settings</span>
          </Link>

          <div className="user-mini">
            <span className="avatar">{initials(user.name)}</span>
            <span className="user-mini-copy">
              <b>{user.name}</b>
              <small>{user.role}</small>
            </span>
            <button
              className="icon-btn"
              aria-label="Open profile menu"
              onClick={() => setSideProfileOpen(v => !v)}
            >
              <ChevronDown size={16} />
            </button>
            {sideProfileOpen && (
              <div className="profile-menu">
                <button
                  onClick={() => {
                    setSideProfileOpen(false)
                    navigate('/settings')
                  }}
                >
                  <UserRound size={15} /> Profile & settings
                </button>
                <button
                  onClick={() => {
                    setSideProfileOpen(false)
                    onLogout()
                  }}
                >
                  <LogOut size={15} /> Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <button
          className="mobile-scrim"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* MAIN VIEW */}
      <main className="app-main">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-btn mobile-menu" onClick={() => setMobileOpen(true)}>
              <Menu size={20} />
            </button>
            <span className="breadcrumbs">
              <b>{title}</b>
            </span>
          </div>

          <div className="topbar-right">
            {/* Notifications Button */}
            <button
              className="icon-btn notification-btn"
              aria-label="Notifications"
              onClick={() => setNotice(!notice)}
            >
              <Bell size={19} />
              {notifications.length > 0 && <i />}
            </button>

            {notice && (
              <div className="notification-pop">
                <div className="notification-heading">
                  <b style={{ color: 'var(--ink-heading)' }}>Notifications</b>
                  <button className="text-action" onClick={() => setNotice(false)}>
                    Close
                  </button>
                </div>
                {notifications.length ? (
                  notifications.map((n, i) => (
                    <p key={`${n.kind}-${i}`}>
                      <span
                        className={`dot ${
                          n.kind === 'task'
                            ? 'dot-blue'
                            : n.kind === 'meeting'
                            ? 'dot-orange'
                            : 'dot-green'
                        }`}
                      />
                      {n.text}
                    </p>
                  ))
                ) : (
                  <div className="notification-empty">
                    <CheckCheck size={20} />
                    <span>You're all caught up.</span>
                  </div>
                )}
                <small className="notification-foot">
                  Based on local sample data; live alerts require a backend.
                </small>
              </div>
            )}

            {/* User Profile Menu */}
            <div className="top-profile-wrap">
              <button
                className="top-user"
                onClick={() => setProfileOpen(v => !v)}
                aria-expanded={profileOpen}
              >
                <span className="avatar">{initials(user.name)}</span>
                <span>{user.name}</span>
                <ChevronDown size={15} />
              </button>
              {profileOpen && (
                <div className="profile-menu top-profile-menu">
                  <button
                    onClick={() => {
                      setProfileOpen(false)
                      navigate('/settings')
                    }}
                  >
                    <UserRound size={15} /> Profile & settings
                  </button>
                  <button
                    onClick={() => {
                      setProfileOpen(false)
                      onLogout()
                    }}
                  >
                    <LogOut size={15} /> Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="page-content">{children}</div>
      </main>

      {/* PLANS MODAL */}
      {plansOpen && (
        <div className="modal-backdrop" role="presentation" onClick={() => setPlansOpen(false)}>
          <section
            className="plans-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="plans-title"
            onClick={e => e.stopPropagation()}
          >
            <div className="plans-modal-head">
              <div>
                <span className="eyebrow">PLANS & USAGE</span>
                <h2 id="plans-title">Choose the plan that fits your team</h2>
                <p>Plan comparison only — payments and upgrades are not connected.</p>
              </div>
              <button className="icon-btn" aria-label="Close plans" onClick={() => setPlansOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="plans-grid">
              {[
                {
                  name: 'Free',
                  price: '₹0',
                  limit: '5 meetings / month',
                  features: ['Up to 60 minutes per meeting', 'Basic meeting workspace', 'Local sample data'],
                  current: true
                },
                {
                  name: 'Pro',
                  price: 'Planned',
                  limit: 'Higher monthly upload limit',
                  features: ['Longer meeting recordings', 'Advanced exports', 'Priority processing'],
                  current: false
                },
                {
                  name: 'Team',
                  price: 'Planned',
                  limit: 'Shared team workspace',
                  features: ['Team collaboration', 'Manager insights', 'Centralized administration'],
                  current: false
                }
              ].map(plan => (
                <article
                  className={`plan-card ${plan.current ? 'plan-current' : ''}`}
                  key={plan.name}
                >
                  <div className="plan-title-row">
                    <h3>{plan.name}</h3>
                    {plan.current && <span className="small-pill">Current</span>}
                  </div>
                  <b className="plan-price">{plan.price}</b>
                  <p>{plan.limit}</p>
                  <ul>
                    {plan.features.map(f => (
                      <li key={f}>
                        <Check size={14} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`btn ${plan.current ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => setPlansOpen(false)}
                  >
                    {plan.current ? 'Current plan' : 'Coming soon'}
                  </button>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
