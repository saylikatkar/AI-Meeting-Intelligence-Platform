import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, ShieldCheck, Zap, Users, Heart } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/**
 * ABOUT US PAGE
 * New page — write your own content here.
 * Skeleton structure is ready, just fill in the details below.
 */

const team = [
  { name: 'Your Name', role: 'Founder & CEO', initials: 'YN', bio: 'Add a short bio here.' },
  { name: 'Team Member', role: 'CTO', initials: 'TM', bio: 'Add a short bio here.' },
  { name: 'Team Member', role: 'Head of Design', initials: 'TM', bio: 'Add a short bio here.' },
  { name: 'Team Member', role: 'Lead Engineer', initials: 'TM', bio: 'Add a short bio here.' },
]

const values = [
  { icon: <ShieldCheck size={22} />, title: 'Privacy First', desc: 'We never store your voice data beyond the processing window, and we never sell your data.' },
  { icon: <Zap size={22} />, title: 'Speed & Reliability', desc: 'Our infrastructure is built for sub-5-minute turnaround even on long recordings.' },
  { icon: <Users size={22} />, title: 'Team Focused', desc: 'Built for collaboration — from solo founders to enterprise teams of hundreds.' },
  { icon: <Heart size={22} />, title: 'Human-Centered AI', desc: 'AI handles the heavy lifting so your team can focus on decisions, not note-taking.' },
]

export default function AboutUsPage() {
  return (
    <div className="landing-page">
      <div className="landing-ambient" />
      <Navbar />

      {/* Hero */}
      <section className="hero-section" style={{ paddingBottom: 0 }}>
        <span className="section-badge" style={{ margin: '0 auto 16px' }}>Our Story</span>
        <h1 className="hero-title">
          <span className="hero-title-main">Built by people who</span>
          <span className="hero-title-accent">hated taking notes</span>
        </h1>
        <p className="hero-subtitle">
          {/* ✏️ Write your founding story here */}
          MeetingIntel was born out of frustration — countless hours spent rewatching recordings
          and manually summarising meetings. We built the tool we always wanted.
        </p>
      </section>

      {/* Mission */}
      <section className="landing-section">
        <div className="preview-showcase" style={{ maxWidth: 760, margin: '0 auto' }}>
          <div className="preview-bar">
            <div className="preview-dots">
              <span className="preview-dot" style={{ background: '#ef4444' }} />
              <span className="preview-dot" style={{ background: '#f59e0b' }} />
              <span className="preview-dot" style={{ background: '#10b981' }} />
            </div>
            <div className="small-pill"><Sparkles size={12} /> Our Mission</div>
          </div>
          <div className="preview-content">
            <h3 style={{ margin: '0 0 12px' }}>Making every meeting count</h3>
            {/* ✏️ Replace this with your mission statement */}
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, margin: 0, fontSize: 15 }}>
              We believe every conversation at work contains valuable decisions, commitments,
              and context — but most of it gets lost. MeetingIntel's mission is to make sure
              none of that intelligence is ever wasted. We turn recordings into structured,
              searchable, actionable knowledge your whole team can act on — in minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="landing-section">
        <div className="section-head">
          <span className="section-badge">What We Stand For</span>
          <h2 className="section-title">Our core values</h2>
        </div>
        <div className="features-grid">
          {values.map((v, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon-wrap">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="landing-section">
        <div className="section-head">
          <span className="section-badge">The Team</span>
          <h2 className="section-title">The people behind MeetingIntel</h2>
          <p className="section-desc">
            {/* ✏️ Update team members in the `team` array above */}
            A small, focused team with a big obsession: making meetings matter.
          </p>
        </div>
        <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
          {team.map((member, i) => (
            <div className="feature-card" key={i} style={{ textAlign: 'center', alignItems: 'center' }}>
              <span
                className="avatar"
                style={{ width: 56, height: 56, fontSize: 20, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {member.initials}
              </span>
              <h3 style={{ margin: '0 0 4px', fontSize: 16 }}>{member.name}</h3>
              <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--primary-accent)', fontWeight: 600 }}>
                {member.role}
              </p>
              <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="landing-section">
        <div className="section-head">
          <span className="section-badge">By the Numbers</span>
          <h2 className="section-title">MeetingIntel in numbers</h2>
        </div>
        <div className="steps-grid">
          {[
            { num: '10,000+', label: 'Meetings Processed' },
            { num: '42 min', label: 'Avg. Time Saved per Meeting' },
            { num: '99.4%', label: 'Transcript Accuracy' },
            { num: '<5 min', label: 'Avg. Processing Time' },
          ].map((stat, i) => (
            <div className="step-card" key={i} style={{ textAlign: 'center' }}>
              <span className="step-num" style={{ fontSize: 28 }}>{stat.num}</span>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: 14 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <h2>Join us on the journey</h2>
        <p>Start for free. No credit card needed. Cancel anytime.</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/pricing" className="btn-hero-primary">
            Get Started Free <ArrowRight size={17} />
          </Link>
          <Link to="/features" className="btn-hero-secondary">
            Explore Features
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
