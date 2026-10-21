import { useState } from 'react'
import { Users } from 'lucide-react'
import { initials } from '../../utils/helpers'
import { PageHeading } from '../../components/ui/PageHeading'

export function UsersPage() {
  const [users, setUsers] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem('meetingintel_users_v2') || '[]')
      )
    } catch {
      return []
    }
  })
  const [message, setMessage] = useState('')

  function changeRole(id, role) {
    const next = users.map(user => (user.id === id ? { ...user, role } : user))
    localStorage.setItem('meetingintel_users_v2', JSON.stringify(next))
    setUsers(next)
    setMessage('User role saved in this browser.')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <>
      <PageHeading
        eyebrow="ADMINISTRATION"
        title="User management"
        description="Review registered users and manage their workspace roles."
      />
      <section className="panel action-panel">
        <div className="panel-heading">
          <div>
            <h2>Registered users</h2>
            <p>Accounts stored in this browser only.</p>
          </div>
          <span className="small-pill">{users.length} users</span>
        </div>
        {message && (
          <div style={{ padding: '0 20px' }}>
            <p className="success-inline" role="status">
              {message}
            </p>
          </div>
        )}
        {users.length === 0 ? (
          <div className="empty-state">
            <Users size={25} />
            <b>No registered users found</b>
            <span>Accounts created through Register will appear here.</span>
          </div>
        ) : (
          <div className="action-list">
            {users.map(user => (
              <div className="action-row" key={user.id}>
                <span className="avatar">{initials(user.name || user.email || 'U')}</span>
                <span className="action-task">
                  <b>{user.name || 'Unnamed user'}</b>
                  <small>{user.email}</small>
                </span>
                <select
                  aria-label={`Role for ${user.email}`}
                  value={user.role || 'Member'}
                  onChange={e => changeRole(user.id, e.target.value)}
                  style={{ marginLeft: 'auto' }}
                >
                  <option>Member</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
