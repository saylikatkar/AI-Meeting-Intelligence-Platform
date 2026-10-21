import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCheck, Clock3, FileText, ListTodo } from 'lucide-react'
import { sampleTeam } from '../../data'
import { initials } from '../../utils/helpers'
import { PageHeading } from '../../components/ui/PageHeading'
import { StatCard } from '../../components/ui/StatCard'
import { MeetingRow } from '../../components/ui/MeetingRow'

export function ManagerDashboard({ meetings, onOpen }) {
  return (
    <>
      <PageHeading
        eyebrow="TEAM WORKSPACE"
        title="Team overview"
        description="Keep track of your team's meetings and commitments."
        action={
          <Link to="/meetings" className="btn btn-secondary">
            <FileText size={17} /> Team meetings
          </Link>
        }
      />
      <div className="stats-grid">
        <StatCard label="Team meetings" value="28" change="+12%" Icon={FileText} />
        <StatCard label="Hours in meetings" value="46.5" change="+8%" Icon={Clock3} tone="purple" />
        <StatCard label="Open action items" value="14" change="-3" Icon={ListTodo} tone="orange" />
        <StatCard label="Completed tasks" value="86%" change="+6%" Icon={CheckCheck} tone="green" />
      </div>
      <div className="dashboard-grid">
        <section className="panel meetings-panel">
          <div className="panel-heading">
            <div>
              <h2>Team meeting activity</h2>
              <p>Latest team records · sample data</p>
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
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Team at a glance</h2>
              <p>Illustrative workspace members</p>
            </div>
          </div>
          {sampleTeam
            .filter(t => t.role !== 'Admin')
            .slice(0, 3)
            .map(t => (
              <div className="person-row" key={t.email}>
                <span className="avatar">{initials(t.name)}</span>
                <span>
                  <b>{t.name}</b>
                  <small>
                    {t.role} · {t.meetings} meetings
                  </small>
                </span>
                <span className="person-active" />
              </div>
            ))}
          <div style={{ padding: '0 20px 20px' }}>
            <Link to="/actions" className="btn btn-secondary btn-full">
              Review action items <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
