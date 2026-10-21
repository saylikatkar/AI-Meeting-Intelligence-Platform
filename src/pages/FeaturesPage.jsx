import React from 'react'
import { Link } from 'react-router-dom'
import {
  Activity, ArrowDownToLine, ArrowRight, FileText, ListTodo,
  MessageSquareText, Sparkles, Zap, Shield, Search, Download
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/**
 * FEATURES PAGE
 * Full-page breakdown of all platform capabilities.
 */

const features = [
  {
    icon: <Sparkles size={22} />,
    title: 'Executive Summaries',
    desc: 'High-level overviews, key takeaways, and core decisions distilled automatically by intelligence models.'
  },
  {
    icon: <MessageSquareText size={22} />,
    title: 'Interactive Transcripts',
    desc: 'Timestamp-synchronized transcripts with speaker diarization, in-line search, and instant editing.'
  },
  {
    icon: <ListTodo size={22} />,
    title: 'Automated Action Items',
    desc: 'Detect commitments, owners, and due dates automatically. Organize follow-ups in list or Kanban view.'
  },
  {
    icon: <Activity size={22} />,
    title: 'Speaker Participation',
    desc: 'Measure speaker talk-time split, engagement trends, and team communication balance.'
  },
  {
    icon: <FileText size={22} />,
    title: 'Meeting Comparison',
    desc: 'Compare recurring syncs side-by-side to track unresolved questions, velocity, and follow-through.'
  },
  {
    icon: <ArrowDownToLine size={22} />,
    title: 'Multi-Format Exports',
    desc: 'Download complete meeting packages in PDF, DOCX, TXT, JSON, SRT, VTT, or CSV formats.'
  },
  {
    icon: <Shield size={22} />,
    title: 'Privacy-First Processing',
    desc: 'Zero biometric voice retention. Files are encrypted in transit and never used for model training.'
  },
  {
    icon: <Search size={22} />,
    title: 'Smart Search',
    desc: 'Search across all meetings by keyword, speaker, date range, or topic to find any moment instantly.'
  },
  {
    icon: <Zap size={22} />,
    title: 'Ultra-Fast Processing',
    desc: 'State-of-the-art inference pipeline delivers results in minutes, not hours — regardless of recording length.'
  }
]

export default function FeaturesPage() {
  return (
    <div className="landing-page">
      <div className="landing-ambient" />
      <Navbar />

      {/* Page Header */}
      <section className="hero-section" style={{ paddingBottom: 0 }}>
        <span className="section-badge" style={{ margin: '0 auto 16px' }}>Platform Capabilities</span>
        <h1 className="hero-title">
          <span className="hero-title-main">Everything you need</span>
          <span className="hero-title-accent">for meeting clarity</span>
        </h1>
        <p className="hero-subtitle">
          Transform messy hour-long meetings into structured intelligence, searchable knowledge,
          and automatically assigned action items.
        </p>
      </section>

      {/* Features Grid */}
      <section className="landing-section">
        <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon-wrap">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Deep-dive highlight */}
      <section className="landing-section">
        <div className="section-head">
          <span className="section-badge">Deep Dive</span>
          <h2 className="section-title">Built for every team size</h2>
          <p className="section-desc">
            Whether you're a solo founder reviewing customer calls or an enterprise team with
            100+ meetings a week, MeetingIntel scales with you.
          </p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <span className="step-num">Solo</span>
            <h3>Individual Plan</h3>
            <p>5 meetings per month, 60-minute recordings, basic exports and transcript access.</p>
          </div>
          <div className="step-card">
            <span className="step-num">Team</span>
            <h3>Team Workspace</h3>
            <p>Shared meeting library, role-based access (Member / Manager / Admin), team analytics.</p>
          </div>
          <div className="step-card">
            <span className="step-num">Scale</span>
            <h3>Enterprise</h3>
            <p>Unlimited recordings, custom retention policies, SSO, audit logs, and priority support.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <h2>Ready to see it in action?</h2>
        <p>Start with the free plan — no credit card required.</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/pricing" className="btn-hero-primary">
            See Pricing <ArrowRight size={17} />
          </Link>
          <Link to="/how-it-works" className="btn-hero-secondary">
            How It Works
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
