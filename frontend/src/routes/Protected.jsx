import { Navigate } from 'react-router-dom'

export function Protected({ user, children, roles }) {
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/app" replace />
  return children
}
