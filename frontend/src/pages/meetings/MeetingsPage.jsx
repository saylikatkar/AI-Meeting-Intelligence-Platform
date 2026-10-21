import { useMemo, useState } from 'react'
import { Filter, Search, X } from 'lucide-react'
import { PageHeading } from '../../components/ui/PageHeading'
import { MeetingRow } from '../../components/ui/MeetingRow'

export function MeetingsPage({ meetings, onOpen, user, onDelete }) {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('All status')
  const [sort, setSort] = useState('Newest first')

  const shown = useMemo(() => {
    const list = meetings.filter(
      m =>
        (m.title + ' ' + m.id + ' ' + (m.summary || '')).toLowerCase().includes(q.toLowerCase()) &&
        (filter === 'All status' || m.status === filter)
    )
    return [...list].sort((a, b) =>
      sort === 'Newest first'
        ? String(b.id).localeCompare(String(a.id))
        : String(a.id).localeCompare(String(b.id))
    )
  }, [meetings, q, filter, sort])

  return (
    <>
      <PageHeading
        eyebrow={user.role === 'Member' ? 'YOUR LIBRARY' : 'MEETING MANAGEMENT'}
        title={user.role === 'Member' ? 'My meetings' : 'Meeting records'}
        description="Search meetings by title, ID, or summary; filter by status and open a record."
      />
      <section className="panel table-panel">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={17} />
            <input
              placeholder="Search meetings, transcript topics..."
              value={q}
              onChange={e => setQ(e.target.value)}
            />
          </div>
          <div className="toolbar-right">
            <label className="select-wrap">
              <Filter size={15} />
              <select value={filter} onChange={e => setFilter(e.target.value)}>
                <option>All status</option>
                <option>Completed</option>
                <option>Processing</option>
                <option>Failed</option>
              </select>
            </label>
            <label className="select-wrap">
              <select value={sort} onChange={e => setSort(e.target.value)}>
                <option>Newest first</option>
                <option>Oldest first</option>
              </select>
            </label>
          </div>
        </div>
        <div className="meeting-list">
          {shown.length ? (
            shown.map(m => (
              <div className="meeting-row-wrap" key={m.id}>
                <MeetingRow meeting={m} onOpen={onOpen} />
                <button
                  className="icon-btn delete-meeting"
                  title={`Delete ${m.title}`}
                  aria-label={`Delete ${m.title}`}
                  onClick={() => onDelete(m)}
                >
                  <X size={16} />
                </button>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <Search size={25} />
              <b>No meetings found</b>
              <span>Try a different search or status filter.</span>
            </div>
          )}
        </div>
        <div className="table-footer">
          Showing {shown.length} of {meetings.length} meeting records{' '}
          <span>Search covers available local meeting fields.</span>
        </div>
      </section>
    </>
  )
}
