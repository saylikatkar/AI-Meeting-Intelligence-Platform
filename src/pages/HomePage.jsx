import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, CheckCheck, Clock3, Play, Sparkles, X, Check
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { seedMeetings, seedActions } from '../data'

/**
 * HOME PAGE
 * Contains: Hero, Interactive Preview, mini Features strip, mini How-It-Works strip, CTA banner.
 */
export default function HomePage() {
  const [previewTab, setPreviewTab] = useState('summary')
  const [showDemoModal, setShowDemoModal] = useState(false)

  const sampleMeeting = seedMeetings[0]

  return (
    <div className="landing-page">
      <div className="landing-ambient" />

      <Navbar />

      {/* HERO */}
      <section id="home" className="hero-section">
        <h1 className="hero-title">
          <span className="hero-title-main">Turn Meeting Recordings Into</span>
          <span className="hero-title-accent">Summaries &amp; Action Items</span>
        </h1>
        <p className="hero-subtitle">
          Upload any meeting recording and let AI turn it into a structured conversation,
          executive summary, decisions, and action items in minutes.
        </p>
        <div className="hero-actions">
          <Link to="/features" className="btn-hero-primary">
            Start Analyzing Your Meeting <ArrowRight size={17} />
          </Link>
          <button
            type="button"
            className="btn-hero-secondary"
            onClick={() => setShowDemoModal(true)}
          >
            <Play size={14} fill="currentColor" /> See How It Works
          </button>
        </div>
        <div className="hero-features-strip">
          <span className="hero-feature-item">
            <span className="hero-feature-dot" /> Supports All Media (MP4, MOV, WebM, MP3, WAV)
          </span>
          <span className="hero-feature-item">
            <span className="hero-feature-dot" /> Zero Biometric Voice Surveillance
          </span>
          <span className="hero-feature-item">
            <span className="hero-feature-dot" /> Ultra-Fast Cloud Processing
          </span>
        </div>
      </section>

      {/* INTERACTIVE PREVIEW CARD */}
      <section className="landing-section" style={{ paddingTop: 0 }}>
        <div className="preview-showcase">
          <div className="preview-bar">
            <div className="preview-dots">
              <span className="preview-dot" style={{ background: '#ef4444' }} />
              <span className="preview-dot" style={{ background: '#f59e0b' }} />
              <span className="preview-dot" style={{ background: '#10b981' }} />
            </div>
            <div className="preview-tabs">
              <button
                className={`preview-tab-btn ${previewTab === 'summary' ? 'active' : ''}`}
                onClick={() => setPreviewTab('summary')}
              >
                Executive Summary
              </button>
              <button
                className={`preview-tab-btn ${previewTab === 'transcript' ? 'active' : ''}`}
                onClick={() => setPreviewTab('transcript')}
              >
                Live Transcript
              </button>
              <button
                className={`preview-tab-btn ${previewTab === 'actions' ? 'active' : ''}`}
                onClick={() => setPreviewTab('actions')}
              >
                Action Items (3)
              </button>
            </div>
            <div className="small-pill">Interactive Preview</div>
          </div>

          <div className="preview-content">
            {previewTab === 'summary' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <h3 style={{ margin: 0, fontSize: 18 }}>{sampleMeeting.title}</h3>
                  <span className="status status-completed"><i /> Completed</span>
                </div>
                <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: 14, margin: '0 0 20px' }}>
                  {sampleMeeting.summary}
                </p>
                <div className="insight-grid">
                  <div className="insight-box">
                    <span className="insight-box-icon violet"><Sparkles size={18} /></span>
                    <b>Key Discussion</b>
                    <p>Sprint goals, mobile responsiveness, and file upload validation flows.</p>
                  </div>
                  <div className="insight-box">
                    <span className="insight-box-icon green"><CheckCheck size={18} /></span>
                    <b>Key Decision</b>
                    <p>Finalize the dashboard layout this week and review UX with users.</p>
                  </div>
                  <div className="insight-box">
                    <span className="insight-box-icon orange"><Clock3 size={18} /></span>
                    <b>Time Saved</b>
                    <p>42 minutes saved compared to manual note-taking and transcript review.</p>
                  </div>
                </div>
              </div>
            )}

            {previewTab === 'transcript' && (
              <div className="transcript-list">
                {[
                  { time: '00:10', speaker: 'Ayush Sharma', text: 'We need to complete the project and confirm the release scope with design.' },
                  { time: '00:18', speaker: 'Elena Vance', text: 'The frontend will be completed Thursday, then we can review the upload experience together.' },
                  { time: '00:32', speaker: 'Rahul Mehta', text: 'I will share the sprint notes and verify all action items are assigned.' }
                ].map(line => (
                  <div className="transcript-line" key={line.time}>
                    <span className="timestamp-chip">{line.time}</span>
                    <div className="transcript-text">
                      <b style={{ fontSize: 12, color: 'var(--primary-accent)' }}>{line.speaker}</b>
                      <span style={{ fontSize: 13, color: 'var(--ink)' }}>{line.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {previewTab === 'actions' && (
              <div className="action-list">
                {seedActions.map(action => (
                  <div className="action-row" key={action.id}>
                    <span className="task-check checked"><Check size={12} /></span>
                    <span className="action-task">
                      <b>{action.task}</b>
                      <small>Assignee: {action.owner} · Due {action.due}</small>
                    </span>
                    <span className="small-pill">{action.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="landing-cta">
        <h2>Ready to transform your meetings into momentum?</h2>
        <p>Join teams that save hours every week with MeetingIntel's automated workspace.</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/pricing" className="btn-hero-primary">
            View Pricing Plans <ArrowRight size={17} />
          </Link>
          <Link to="/how-it-works" className="btn-hero-secondary">
            Learn How It Works
          </Link>
        </div>
      </section>

      <Footer />

      {/* DEMO MODAL */}
      {showDemoModal && (
        <div className="modal-backdrop" onClick={() => setShowDemoModal(false)}>
          <div className="plans-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 720 }}>
            <div className="plans-modal-head">
              <div>
                <span className="eyebrow">Interactive Demo</span>
                <h2>How MeetingIntel Works</h2>
                <p>A quick look at how raw recordings become clear execution artifacts.</p>
              </div>
              <button className="icon-btn" onClick={() => setShowDemoModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div style={{ display: 'grid', gap: 16 }}>
              <div className="insight-box">
                <b style={{ color: 'var(--primary-accent)', fontSize: 13 }}>1. File Ingestion &amp; Privacy</b>
                <p>Supports MP4, MOV, WebM, MP3, WAV. Files are encrypted and processed without biometric voice retention.</p>
              </div>
              <div className="insight-box">
                <b style={{ color: 'var(--green)', fontSize: 13 }}>2. Diarized Transcription</b>
                <p>Segments speech by time and speaker with clickable navigation and inline editing.</p>
              </div>
              <div className="insight-box">
                <b style={{ color: 'var(--orange)', fontSize: 13 }}>3. Intelligence &amp; Action Tracking</b>
                <p>Extracts executive summaries, questions, decisions, and creates task cards with due dates.</p>
              </div>
            </div>
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button className="btn btn-secondary" onClick={() => setShowDemoModal(false)}>
                Close
              </button>
              <Link to="/features" className="btn btn-primary" onClick={() => setShowDemoModal(false)}>
                Explore Features <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
