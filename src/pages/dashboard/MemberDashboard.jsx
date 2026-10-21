import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, ArrowRight, CheckCheck, Clock3, FileText, ListTodo, Plus, Sparkles, Upload } from 'lucide-react'
import { PageHeading } from '../../components/ui/PageHeading'
import { StatCard } from '../../components/ui/StatCard'
import { MeetingRow } from '../../components/ui/MeetingRow'

export function MemberDashboard({ user, meetings, onOpen, onUpload }) {
  const done = meetings.filter(m => m.status === 'Completed').length
  return (
    <>
      <PageHeading
        eyebrow="YOUR WORKSPACE"
        title={`Good to see you, ${user.name.split(' ')[0]}`}
        description="Here's what's happening with your meetings."
        action={
          <button className="btn btn-primary" onClick={onUpload}>
            <Plus size={17} /> Upload meeting
          </button>
        }
      />
      <div className="stats-grid">
        <StatCard label="Total meetings" value={meetings.length} change="+2" Icon={FileText} />
        <StatCard label="Minutes processed" value="384" change="+18%" Icon={Clock3} tone="purple" />
        <StatCard label="Completed" value={done} change="+2" Icon={CheckCheck} tone="green" />
        <StatCard
          label="In progress"
          value={meetings.filter(m => m.status === 'Processing').length}
          change="Active"
          Icon={Activity}
          tone="orange"
        />
      </div>
      <div className="dashboard-grid">
        <section className="panel meetings-panel">
          <div className="panel-heading">
            <div>
              <h2>Recent meetings</h2>
              <p>Your latest meeting activity</p>
            </div>
            <Link to="/meetings" className="link-arrow">
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="meeting-list">
            {meetings.slice(0, 4).map(m => (
              <MeetingRow key={m.id} meeting={m} onOpen={onOpen} />
            ))}
          </div>
        </section>
        <section className="panel quick-panel">
          <div className="panel-heading">
            <div>
              <h2>Quick actions</h2>
              <p>Keep your work moving</p>
            </div>
          </div>
          <button className="quick-action" onClick={onUpload}>
            <span className="quick-icon violet">
              <Upload size={19} />
            </span>
            <span>
              <b>Upload a recording</b>
              <small>MP3, WAV, MP4 and more</small>
            </span>
            <ArrowRight size={16} />
          </button>
          <Link className="quick-action" to="/actions">
            <span className="quick-icon mint">
              <ListTodo size={19} />
            </span>
            <span>
              <b>Review action items</b>
              <small>Track decisions and deadlines</small>
            </span>
            <ArrowRight size={16} />
          </Link>
          <button
            className="quick-action"
            onClick={() =>
              alert('AI processing requires a backend connection. This is a frontend preview.')
            }
          >
            <span className="quick-icon amber">
              <Sparkles size={19} />
            </span>
            <span>
              <b>Ask Meeting AI</b>
              <small>Explore the Q&A interface</small>
            </span>
            <ArrowRight size={16} />
          </button>
          <div className="tip-card">
            <Sparkles size={16} />
            <p>
              <b>Make every meeting count</b>
              <br />
              Turn your conversations into clear next steps.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
