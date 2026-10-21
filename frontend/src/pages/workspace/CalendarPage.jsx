import { useState } from 'react'
import { PageHeading } from '../../components/ui/PageHeading'

export function CalendarPage({ meetings, onOpen }) {
  const [month, setMonth] = useState('October 2026')
  return (
    <>
      <PageHeading
        eyebrow="SCHEDULE"
        title="Meeting calendar"
        description="Browse meetings by date. Dates are illustrative until the backend supplies scheduled times."
        action={
          <div className="view-toggle">
            <button onClick={() => setMonth('September 2026')}>Previous</button>
            <button className="active">{month}</button>
            <button onClick={() => setMonth('November 2026')}>Next</button>
          </div>
        }
      />
      <section className="panel calendar-panel">
        <div className="calendar-grid">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
            <b className="calendar-day-name" key={d}>
              {d}
            </b>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const day = i - 2
            const meeting = meetings[day % Math.max(1, meetings.length)]
            return (
              <div className={`calendar-cell ${day < 1 || day > 31 ? 'outside' : ''}`} key={i}>
                <span>{day < 1 ? 30 + day : day > 31 ? day - 31 : day}</span>
                {day > 0 && day <= meetings.length && meeting && (
                  <button onClick={() => onOpen(meeting)} title={meeting.title}>
                    <i />
                    {meeting.title}
                  </button>
                )}
              </div>
            )
          })}
        </div>
        <p className="muted" style={{ fontSize: 10, marginTop: 12 }}>
          Calendar dates and meeting placement are demo data, not a synced calendar.
        </p>
      </section>
    </>
  )
}
