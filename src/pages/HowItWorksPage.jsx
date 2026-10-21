import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Upload, Mic2, Sparkles, ListTodo } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/**
 * HOW IT WORKS PAGE
 * Step-by-step walkthrough of the MeetingIntel pipeline.
 */

const steps = [
  {
    num: '01',
    icon: <Upload size={24} />,
    title: 'Upload Recording',
    desc: 'Drag and drop audio or video files in MP3, WAV, M4A, MP4, MOV, or WebM formats up to 500MB. Batch uploads supported.',
    detail: 'Your file is encrypted on arrival. We never store raw audio beyond the processing window, and no biometric voice data is retained.'
  },
  {
    num: '02',
    icon: <Mic2 size={24} />,
    title: 'AI Transcription',
    desc: 'State-of-the-art speech recognition transcribes every word with precise timestamps and speaker labels.',
    detail: 'Powered by advanced diarization models that distinguish between up to 20 unique speakers — even in noisy environments.'
  },
  {
    num: '03',
    icon: <Sparkles size={24} />,
    title: 'Extract Intelligence',
    desc: 'Smart models generate executive summaries, key decisions, open questions, and follow-up commitments.',
    detail: 'You get a structured document within minutes: headline summary, a full bullet decision log, and a prioritized action item list.'
  },
  {
    num: '04',
    icon: <ListTodo size={24} />,
    title: 'Track & Export',
    desc: 'Manage deliverables on the Kanban board, ask questions via Meeting AI, and export full documentation.',
    detail: 'Export to PDF, DOCX, CSV, SRT, VTT, JSON, or TXT. Integrate directly into Notion, Jira, Slack, or your own toolchain.'
  }
]

export default function HowItWorksPage() {
  return (
    <div className="landing-page">
      <div className="landing-ambient" />
      <Navbar />

      {/* Page header */}
      <section className="hero-section" style={{ paddingBottom: 0 }}>
        <span className="section-badge" style={{ margin: '0 auto 16px' }}>Workflow</span>
        <h1 className="hero-title">
          <span className="hero-title-main">Four simple steps</span>
          <span className="hero-title-accent">from audio to action</span>
        </h1>
        <p className="hero-subtitle">
          Designed for frictionless productivity so your team spends less time taking notes
          and more time shipping.
        </p>
      </section>

      {/* Steps — detailed cards */}
      <section className="landing-section">
        <div style={{ display: 'grid', gap: 28, maxWidth: 820, margin: '0 auto' }}>
          {steps.map((step, i) => (
            <div
              key={i}
              className="feature-card"
              style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: 20, alignItems: 'start' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <span className="step-num">{step.num}</span>
                <span className="feature-icon-wrap" style={{ width: 40, height: 40, fontSize: 18 }}>
                  {step.icon}
                </span>
              </div>
              <div>
                <h3 style={{ marginTop: 0 }}>{step.title}</h3>
                <p style={{ marginBottom: 10 }}>{step.desc}</p>
                <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick visual steps strip */}
      <section className="landing-section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <span className="section-badge">At a Glance</span>
          <h2 className="section-title">Under 5 minutes, start to finish</h2>
        </div>
        <div className="steps-grid">
          {steps.map((step, i) => (
            <div className="step-card" key={i}>
              <span className="step-num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="landing-section" style={{ maxWidth: 720, margin: '0 auto' }}>
        <div className="section-head">
          <span className="section-badge">FAQ</span>
          <h2 className="section-title">Common questions</h2>
        </div>
        <div style={{ display: 'grid', gap: 16 }}>
          {[
            { q: 'What file formats are supported?', a: 'MP3, WAV, M4A, MP4, MOV, and WebM — up to 500 MB per upload.' },
            { q: 'How long does processing take?', a: 'Most recordings are fully processed within 2–5 minutes, depending on length and server load.' },
            { q: 'Is my data private?', a: 'Yes. Files are encrypted in transit, processed in isolated sandboxes, and never used for model training.' },
            { q: 'Can I edit the transcript?', a: 'Absolutely. The inline editor lets you correct any word, reassign speakers, or add timestamps.' },
            { q: 'How do I export results?', a: 'Choose from PDF, DOCX, TXT, JSON, CSV, SRT, or VTT from the export panel in any meeting view.' },
          ].map((faq, i) => (
            <div key={i} className="insight-box">
              <b style={{ color: 'var(--primary-accent)', fontSize: 14 }}>{faq.q}</b>
              <p style={{ margin: '6px 0 0', fontSize: 14 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <h2>See it for yourself</h2>
        <p>Start with a free upload and experience the full pipeline in action.</p>
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
