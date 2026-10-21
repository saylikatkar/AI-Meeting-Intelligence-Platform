import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, FileText, Headphones, Users, Zap } from 'lucide-react'
import { PageHeading } from '../../components/ui/PageHeading'
import { StatCard } from '../../components/ui/StatCard'
import { MeetingRow } from '../../components/ui/MeetingRow'

export function AdminDashboard({ meetings, onOpen }) {
  return (
    <>
      <PageHeading
        eyebrow="PLATFORM CONTROL"
        title="Admin overview"
        description="Monitor platform activity and manage your workspace."
        action={
          <Link to="/users" className="btn btn-primary">
            <Users size={17} /> Manage users
          </Link>
        }
      />
      <div className="stats-grid">
        <StatCard label="Registered users" value="2,481" change="+42" Icon={Users} />
        <StatCard label="Total meetings" value="6,492" change="+128" Icon={FileText} tone="purple" />
        <StatCard label="Audio hours" value="18,430" change="+9.4%" Icon={Headphones} tone="green" />
        <StatCard label="AI requests today" value="1,420" change="+16%" Icon={Zap} tone="orange" />
      </div>
      <div className="dashboard-grid">
        <section className="panel meetings-panel">
          <div className="panel-heading">
            <div>
              <h2>Recent platform meetings</h2>
              <p>Illustrative records for UI review</p>
            </div>
            <Link to="/meetings" className="link-arrow">
              Inspect records <ArrowRight size={15} />
            </Link>
          </div>
          <div className="meeting-list">
            {meetings.slice(0, 4).map(m => (
              <MeetingRow key={m.id} meeting={m} onOpen={onOpen} />
            ))}
          </div>
        </section>
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>System health</h2>
              <p>Frontend sample indicators</p>
            </div>
            <span className="health-pill">
              <span /> UI available
            </span>
          </div>
          {[
            ['Frontend routes', 'Operational'],
            ['Database connection', 'Not connected'],
            ['AI processing API', 'Not connected'],
            ['Authentication API', 'Not connected']
          ].map(([l, s]) => (
            <div className="system-row" key={l}>
              <span>{l}</span>
              <span className={s === 'Operational' ? 'sys-ok' : 'sys-muted'}>{s}</span>
            </div>
          ))}
          <div style={{ padding: '0 20px 20px' }}>
            <Link to="/settings" className="btn btn-secondary btn-full">
              Platform settings <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
