import React from 'react'
import { Activity, CheckCheck, Clock3, FileText } from 'lucide-react'
import { PageHeading } from '../../components/ui/PageHeading'
import { StatCard } from '../../components/ui/StatCard'

export function AnalyticsPage() {
  return (
    <>
      <PageHeading
        eyebrow="INSIGHTS"
        title="Analytics"
        description="Review usage patterns and processing health."
      />
      <div className="stats-grid">
        <StatCard label="Meetings this week" value="128" change="+12%" Icon={FileText} />
        <StatCard label="Avg. meeting length" value="34 min" change="-4%" Icon={Clock3} tone="purple" />
        <StatCard label="Action completion" value="86%" change="+6%" Icon={CheckCheck} tone="green" />
        <StatCard label="Processing success" value="98.2%" change="+0.8%" Icon={Activity} tone="orange" />
      </div>
      <div className="dashboard-grid">
        <section className="panel chart-panel">
          <div className="panel-heading">
            <div>
              <h2>Meeting activity</h2>
              <p>Sample weekly totals</p>
            </div>
            <span className="small-pill">Last 7 days</span>
          </div>
          <div className="bar-chart">
            {[
              ['Mon', 45],
              ['Tue', 67],
              ['Wed', 52],
              ['Thu', 88],
              ['Fri', 72],
              ['Sat', 32],
              ['Sun', 24]
            ].map(([day, val]) => (
              <div className="bar-column" key={day}>
                <span>{val}</span>
                <i style={{ height: `${val}%` }} />
                <small>{day}</small>
              </div>
            ))}
          </div>
        </section>
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Processing status</h2>
              <p>Illustrative distribution</p>
            </div>
          </div>
          {[
            ['Completed', 78, 'green'],
            ['Processing', 16, 'orange'],
            ['Failed', 6, 'red']
          ].map(([label, n, tone]) => (
            <div className="metric-bar" key={label}>
              <div>
                <span>{label}</span>
                <b>{n}%</b>
              </div>
              <i>
                <span className={tone} style={{ width: `${n}%` }} />
              </i>
            </div>
          ))}
          <p className="muted" style={{ padding: '0 22px 16px', fontSize: 10, margin: '14px 0 0' }}>
            Connect analytics APIs to replace these sample values with real metrics.
          </p>
        </section>
      </div>

      <section className="panel" style={{ marginTop: 20 }}>
        <div className="panel-heading">
          <div>
            <h2>Speaker participation</h2>
            <p>Illustrative talk-time split for a sample meeting</p>
          </div>
        </div>
        {[
          ['Speaker 1', 42, 'violet'],
          ['Speaker 2', 35, 'green'],
          ['Speaker 3', 23, 'orange']
        ].map(([name, value, tone]) => (
          <div className="metric-bar" key={name}>
            <div>
              <span>{name}</span>
              <b>{value}%</b>
            </div>
            <i>
              <span className={tone} style={{ width: `${value}%` }} />
            </i>
          </div>
        ))}
      </section>
    </>
  )
}
