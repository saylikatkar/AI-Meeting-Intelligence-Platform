import React from 'react'
import { Link } from 'react-router-dom'
import { Brand } from './UI'

/**
 * Shared footer used across all 5 public pages.
 */
export default function Footer() {
  return (
    <footer className="landing-footer">
      <div className="landing-footer-inner">
        <Brand />
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/about">About Us</Link>
          <Link to="/pricing">Pricing</Link>
        </div>
        <div className="footer-copy">
          © 2026 MeetingIntel · AI Meeting Intelligence Platform
        </div>
      </div>
    </footer>
  )
}
