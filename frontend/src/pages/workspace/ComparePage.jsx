import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { PageHeading } from '../../components/ui/PageHeading'
import { Status } from '../../components/ui/Status'

export function ComparePage({ meetings, onOpen }) {
  const [left, setLeft] = useState(meetings[0]?.id || '')
  const [right, setRight] = useState(meetings[1]?.id || meetings[0]?.id || '')

  const a = meetings.find(m => m.id === left)
  const b = meetings.find(m => m.id === right)

  return (
    <>
      <PageHeading
        eyebrow="MEETING REVIEW"
        title="Compare meetings"
        description="Compare summaries, status, duration and attendees across two meeting records."
      />
      <div className="compare-selectors">
        <label className="field">
          <span>First meeting</span>
          <select value={left} onChange={e => setLeft(e.target.value)}>
            {meetings.map(m => (
              <option key={m.id} value={m.id}>
                {m.title}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Second meeting</span>
          <select value={right} onChange={e => setRight(e.target.value)}>
            {meetings.map(m => (
              <option key={m.id} value={m.id}>
                {m.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="compare-grid">
        {[a, b].map((m, i) =>
          m ? (
            <section className="panel compare-card" key={`${m.id}-${i}`}>
              <span className="eyebrow">MEETING {i + 1}</span>
              <h2>{m.title}</h2>
              <Status status={m.status} />
              <div className="compare-metrics">
                <div>
                  <small>Date</small>
                  <b>{m.date}</b>
                </div>
                <div>
                  <small>Duration</small>
                  <b>{m.duration}</b>
                </div>
                <div>
                  <small>Attendees</small>
                  <b>{m.attendees}</b>
                </div>
              </div>
              <h3 style={{ fontSize: 13, margin: '18px 0 6px' }}>Summary</h3>
              <p>{m.summary || 'No summary available.'}</p>
              <button
                className="btn btn-secondary"
                style={{ marginTop: 14 }}
                onClick={() => onOpen(m)}
              >
                Open meeting <ArrowRight size={15} />
              </button>
            </section>
          ) : (
            <section className="panel empty-state" key={i}>
              No meeting selected.
            </section>
          )
        )}
      </div>
    </>
  )
}
