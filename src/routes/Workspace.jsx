import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AppLayout } from '../layouts/AppLayout'
import { MemberDashboard } from '../pages/dashboard/MemberDashboard'
import { ManagerDashboard } from '../pages/dashboard/ManagerDashboard'
import { AdminDashboard } from '../pages/dashboard/AdminDashboard'
import { MeetingsPage } from '../pages/meetings/MeetingsPage'
import { UploadPage } from '../pages/meetings/UploadPage'
import { MeetingDetail } from '../pages/meetings/MeetingDetail'
import { ActionItems } from '../pages/workspace/ActionItems'
import { AnalyticsPage } from '../pages/workspace/AnalyticsPage'
import { CalendarPage } from '../pages/workspace/CalendarPage'
import { ComparePage } from '../pages/workspace/ComparePage'
import { SettingsPage } from '../pages/workspace/SettingsPage'
import { UsersPage } from '../pages/workspace/UsersPage'

export function Workspace({ user, onLogout, meetings, setMeetings }) {
  const location = useLocation()
  const navigate = useNavigate()

  const selected = location.pathname.startsWith('/meeting/')
    ? meetings.find(m => m.id === decodeURIComponent(location.pathname.split('/').pop()))
    : null

  function openMeeting(m) {
    navigate(`/meeting/${encodeURIComponent(m.id)}`)}

  function deleteMeeting(m) {
    if (!window.confirm(`Delete meeting "${m.title}" and its local record?`)) return
    setMeetings(prev => prev.filter(x => x.id !== m.id))
    try {
      const storedActions = JSON.parse(
        localStorage.getItem('meetingintel_actions') ||
        localStorage.getItem('meetmind_actions') ||
        '[]'
      )
      const filtered = storedActions.filter(a => a.meeting !== m.title)
      localStorage.setItem('meetingintel_actions', JSON.stringify(filtered))
    } catch (e) {}
    if (location.pathname.startsWith('/meeting/')) navigate('/meetings')
  }

  function uploaded(file) {
    const m = {
      id: `LOCAL-${Date.now().toString().slice(-5)}`,
      title: file.name.replace(/\.[^.]+$/, ''),
      date: 'Just now',
      duration: 'Pending',
      status: 'Processing',
      attendees: 1,
      owner: user.name,
      summary:
        'File selected locally. Actual transcription and analysis are unavailable until a backend is connected.'
    }
    setMeetings(prev => [m, ...prev])
    navigate('/meetings')
  }

  let page
  if (location.pathname === '/app') {
    page =
      user.role === 'Admin' ? (
        <AdminDashboard meetings={meetings} onOpen={openMeeting} />
      ) : user.role === 'Manager' ? (
        <ManagerDashboard meetings={meetings} onOpen={openMeeting} />
      ) : (
        <MemberDashboard
          user={user}
          meetings={meetings}
          onOpen={openMeeting}
          onUpload={() => navigate('/upload')}
        />
      )
  } else if (location.pathname === '/meetings') {
    page = (
      <MeetingsPage
        meetings={meetings}
        onOpen={openMeeting}
        onDelete={deleteMeeting}
        user={user}
      />
    )
  } else if (location.pathname === '/upload') {
    page = <UploadPage onUploaded={uploaded} />
  } else if (location.pathname === '/actions') {
    page = <ActionItems />
  } else if (location.pathname === '/analytics') {
    page = <AnalyticsPage />
  } else if (location.pathname === '/calendar') {
    page = <CalendarPage meetings={meetings} onOpen={openMeeting} />
  } else if (location.pathname === '/compare') {
    page = <ComparePage meetings={meetings} onOpen={openMeeting} />
  } else if (location.pathname === '/users') {
    page = user.role === 'Admin' ? <UsersPage /> : <Navigate to="/app" replace />
  } else if (location.pathname === '/settings') {
    page = <SettingsPage user={user} />
  } else if (location.pathname.startsWith('/meeting/')) {
    page = (
      <MeetingDetail
        meeting={selected}
        onBack={() => navigate('/meetings')}
        onDelete={deleteMeeting}
      />
    )
  } else {
    page = <Navigate to="/app" replace />
  }

  return (
    <AppLayout user={user} onLogout={onLogout}>
      {page}
    </AppLayout>
  )
}
