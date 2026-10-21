import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, X, Zap } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/**
 * PRICING PAGE
 * Extracted from the Plans modal in the original app.
 * Fully standalone — write your real pricing here.
 */

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: '/month',
    tagline: 'Perfect for individuals getting started',
    limit: '5 meetings / month',
    cta: 'Start for Free',
    current: false,
    features: [
      'Up to 5 meetings per month',
      '60-minute max per recording',
      'Basic executive summary',
      'Interactive transcript',
      'Action item detection',
      'TXT & PDF export',
    ],
    missing: [
      'Advanced exports (DOCX, CSV, SRT)',
      'Speaker analytics',
      'Meeting comparison',
      'Priority processing',
      'Team workspace',
    ]
  },
  {
    name: 'Pro',
    price: 'Coming Soon',
    period: '',
    tagline: 'For power users who need more',
    limit: 'Higher monthly upload limit',
    cta: 'Join Waitlist',
    current: true,
    badge: 'Most Popular',
    features: [
      'Unlimited meetings',
      'Up to 3-hour recordings',
      'Full executive summary & decisions',
      'Interactive transcript + inline edit',
      'Automated action items & Kanban',
      'All export formats',
      'Speaker participation analytics',
      'Meeting comparison',
      'Priority processing',
    ],
    missing: [
      'Team workspace & admin panel',
    ]
  },
  {
    name: 'Team',
    price: 'Coming Soon',
    period: '',
    tagline: 'Built for entire teams',
    limit: 'Shared team workspace',
    cta: 'Contact Us',
    current: false,
    features: [
      'Everything in Pro',
      'Shared team meeting library',
      'Role-based access (Member / Manager / Admin)',
      'Team analytics dashboard',
      'Centralized action item tracking',
      'SSO / enterprise auth (planned)',
      'Dedicated support',
      'Custom data retention policies',
    ],
    missing: []
  }
]

export default function PricingPage() {
  const [billing] = useState('monthly')

  return (
    <div className="landing-page">
      <div className="landing-ambient" />
      <Navbar />

      {/* Page Header */}
      <section className="hero-section" style={{ paddingBottom: 0 }}>
        <span className="section-badge" style={{ margin: '0 auto 16px' }}>Plans &amp; Pricing</span>
        <h1 className="hero-title">
          <span className="hero-title-main">Simple, transparent</span>
          <span className="hero-title-accent">pricing for every team</span>
        </h1>
        <p className="hero-subtitle">
          Start free and scale as you grow. No hidden fees. Cancel anytime.
        </p>
      </section>

      {/* Plans Grid */}
      <section className="landing-section">
        <div className="plans-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24, maxWidth: 960, margin: '0 auto' }}>
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`plan-card ${plan.current ? 'plan-current' : ''}`}
              style={{ position: 'relative' }}
            >
              {plan.badge && (
                <span
                  className="section-badge"
                  style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}
                >
                  {plan.badge}
                </span>
              )}
              <div className="plan-title-row">
                <h3>{plan.name}</h3>
              </div>
              <span className="plan-price">{plan.price}{plan.period}</span>
              <p style={{ color: 'var(--muted)', fontSize: 13, margin: '8px 0 0' }}>{plan.tagline}</p>

              <div style={{ margin: '20px 0', borderTop: '1px solid var(--line)', paddingTop: 20 }}>
                <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  What's included
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {plan.features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                      <span style={{ color: 'var(--green)', flexShrink: 0 }}><Check size={15} /></span>
                      {f}
                    </li>
                  ))}
                  {plan.missing.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--muted)', opacity: 0.6 }}>
                      <span style={{ flexShrink: 0 }}><X size={15} /></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/"
                className={`btn ${plan.current ? 'btn-primary' : 'btn-secondary'} btn-full`}
                style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6 }}
              >
                {plan.cta} <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Usage / FAQ note */}
      <section className="landing-section" style={{ paddingTop: 0, maxWidth: 720, margin: '0 auto' }}>
        <div className="section-head">
          <span className="section-badge">FAQ</span>
          <h2 className="section-title">Pricing questions answered</h2>
        </div>
        <div style={{ display: 'grid', gap: 16 }}>
          {[
            { q: 'Is the free plan really free?', a: 'Yes — no credit card required. You get 5 meetings per month forever on the free tier.' },
            { q: 'When will Pro and Team plans launch?', a: 'We\'re working on it. Join the waitlist to get early access and a launch discount.' },
            { q: 'Can I change plans later?', a: 'Yes. Upgrade, downgrade, or cancel anytime. Pro-rated refunds on annual plans.' },
            { q: 'Is there a student or nonprofit discount?', a: 'Yes — reach out and we\'ll sort you out with a custom rate.' },
          ].map((faq, i) => (
            <div key={i} className="insight-box">
              <b style={{ color: 'var(--primary-accent)', fontSize: 14 }}>{faq.q}</b>
              <p style={{ margin: '6px 0 0', fontSize: 14 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Usage tracker note */}
      <section className="landing-section" style={{ paddingTop: 0 }}>
        <div
          className="quota-card"
          style={{ maxWidth: 440, margin: '0 auto', padding: 24, borderRadius: 16 }}
        >
          <div className="quota-title">
            <Zap size={15} />
            <span>Free plan — current usage</span>
          </div>
          <div className="quota-numbers">
            <b>0 of 5</b>
            <span>meetings this month</span>
          </div>
          <div className="quota-track"><span /></div>
          <small style={{ color: 'var(--muted)', fontSize: 12 }}>
            Usage resets on the 1st of each month.
          </small>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <h2>Start free today</h2>
        <p>No credit card. No commitment. Just better meetings.</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-hero-primary">
            Get Started Free <ArrowRight size={17} />
          </Link>
          <Link to="/about" className="btn-hero-secondary">
            Learn About Us
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
