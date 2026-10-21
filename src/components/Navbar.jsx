import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import { Brand, ThemeToggle } from './UI'

/**
 * Shared top navigation used across all 5 public pages.
 * Highlights the active page link automatically.
 */
export default function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { label: 'Home', to: '/' },
    { label: 'Features', to: '/features' },
    { label: 'How It Works', to: '/how-it-works' },
    { label: 'About Us', to: '/about' },
    { label: 'Pricing', to: '/pricing' },
  ]

  return (
    <header className="landing-nav">
      <div className="landing-nav-inner">
        <Brand />

        {/* Desktop pill nav */}
        <nav className="nav-pill-group" aria-label="Main Navigation">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-pill ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="icon-btn mobile-menu"
          style={{ display: 'none' }}
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={20} />
        </button>

        {/* Right controls */}
        <div className="nav-right-actions">
          <ThemeToggle />
          <Link to="/login" className="btn btn-secondary">
            Sign in
          </Link>
          <Link to="/pricing" className="btn btn-primary">
            View Pricing <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="modal-backdrop" onClick={() => setMobileOpen(false)}>
          <nav
            className="mobile-nav-drawer"
            onClick={e => e.stopPropagation()}
            style={{
              position: 'fixed', top: 0, right: 0, height: '100vh', width: 260,
              background: 'var(--bg-surface)', padding: '24px 20px',
              display: 'flex', flexDirection: 'column', gap: 12, zIndex: 200
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Brand subtitle={false} />
              <button className="icon-btn" onClick={() => setMobileOpen(false)}><X size={18} /></button>
            </div>
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-pill ${location.pathname === link.to ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/login" className="btn btn-secondary" style={{ marginTop: 12 }} onClick={() => setMobileOpen(false)}>
              Sign in
            </Link>
            <Link to="/pricing" className="btn btn-primary">
              View Pricing <ArrowRight size={15} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
