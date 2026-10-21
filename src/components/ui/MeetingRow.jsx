import React from 'react'
import { ArrowRight, FileAudio } from 'lucide-react'
import { Status } from './Status'

export function MeetingRow({ meeting, onOpen }) {
  return (
    <button className="meeting-row" onClick={() => onOpen(meeting)}>
      <span className="meeting-file">
        <FileAudio size={19} />
      </span>
      <span className="meeting-info">
        <b>{meeting.title}</b>
        <small>
          {meeting.date} <i>·</i> {meeting.duration} <i>·</i> {meeting.attendees} attendees
        </small>
      </span>
      <Status status={meeting.status} />
      <span className="row-chevron">
        <ArrowRight size={17} />
      </span>
    </button>
  )
}
