import React, { useState } from 'react'
import { CalendarDays, Check } from 'lucide-react'
import { seedActions } from '../../data'
import { initials } from '../../utils/helpers'
import { PageHeading } from '../../components/ui/PageHeading'

export function ActionItems({ compactMeeting }) {
  const [items, setItems] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem('meetingintel_actions') ||
          localStorage.getItem('meetmind_actions') ||
          'null'
        ) || seedActions
      ).map(i => ({
        ...i,
        status: i.status === 'In progress' ? 'In Progress' : i.status,
        meeting: i.meeting || 'Website Development — Sprint Planning'
      }))
    } catch {
      return seedActions
    }
  })

  const [view, setView] = useState('Board')

  function change(id, status) {
    const next = items.map(i => (i.id === id ? { ...i, status } : i))
    setItems(next)
    localStorage.setItem('meetingintel_actions', JSON.stringify(next))
  }

  const statuses = ['Pending', 'In Progress', 'Completed']

  return (
    <>
      <PageHeading
        eyebrow="FOLLOW-UPS"
        title="Action items"
        description="Track tasks, owners, priorities, meeting sources and due dates."
        action={
          <div className="view-toggle">
            <button className={view === 'Board' ? 'active' : ''} onClick={() => setView('Board')}>
              Kanban board
            </button>
            <button className={view === 'List' ? 'active' : ''} onClick={() => setView('List')}>
              List view
            </button>
          </div>
        }
      />

      <div className="action-summary-strip">
        {statuses.map(status => (
          <div className="action-summary-card" key={status}>
            <span>{status}</span>
            <b>{items.filter(i => i.status === status).length}</b>
          </div>
        ))}
      </div>

      {view === 'Board' ? (
        <div className="kanban-board">
          {statuses.map(status => (
            <section className="kanban-column" key={status}>
              <header>
                <span className={`kanban-dot ${status.toLowerCase().replace(' ', '-')}`} />
                <b style={{ color: 'var(--ink-heading)' }}>{status}</b>
                <span className="small-pill">{items.filter(i => i.status === status).length}</span>
              </header>
              {items
                .filter(
                  i =>
                    i.status === status &&
                    (!compactMeeting ||
                      String(i.meeting).toLowerCase().includes(compactMeeting.toLowerCase()))
                )
                .map(item => (
                  <article className="kanban-card" key={item.id}>
                    <div className="kanban-card-top">
                      <span className={`priority-tag ${(item.priority || 'Medium').toLowerCase()}`}>
                        {item.priority || 'Medium'} priority
                      </span>
                      <span className="kanban-menu">•••</span>
                    </div>
                    <b>{item.task}</b>
                    <small>{item.meeting}</small>
                    <div className="kanban-card-footer">
                      <span className="avatar">{initials(item.owner || 'U')}</span>
                      <span>{item.owner || 'Unassigned'}</span>
                      <span className="due-date">
                        <CalendarDays size={13} />
                        {item.due || 'No due date'}
                      </span>
                    </div>
                    <label className="kanban-status-label">
                      Move task
                      <select
                        value={item.status}
                        onChange={e => change(item.id, e.target.value)}
                        aria-label={`Move ${item.task}`}
                      >
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                    </label>
                  </article>
                ))}
            </section>
          ))}
        </div>
      ) : (
        <section className="panel action-panel">
          <div className="action-list">
            {items
              .filter(
                i =>
                  !compactMeeting ||
                  String(i.meeting).toLowerCase().includes(compactMeeting.toLowerCase())
              )
              .map(item => (
                <div className="action-row" key={item.id}>
                  <button
                    type="button"
                    className={`task-check ${item.status === 'Completed' ? 'checked' : ''}`}
                    aria-label={`Complete ${item.task}`}
                    onClick={() =>
                      change(item.id, item.status === 'Completed' ? 'Pending' : 'Completed')
                    }
                  >
                    {item.status === 'Completed' && <Check size={13} />}
                  </button>
                  <span className="action-task">
                    <b className={item.status === 'Completed' ? 'task-done' : ''}>
                      {item.task}
                    </b>
                    <small>Meeting: {item.meeting}</small>
                    <small>
                      Assignee: {item.owner} · Due {item.due}
                    </small>
                  </span>
                  <select
                    value={item.status}
                    onChange={e => change(item.id, e.target.value)}
                    style={{ marginLeft: 'auto' }}
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              ))}
          </div>
        </section>
      )}
    </>
  )
}
