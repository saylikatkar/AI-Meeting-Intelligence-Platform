export const sampleTranscript = [
  { time: '00:10', seconds: 10, speaker: 'Speaker 1', text: 'We need to complete the project and confirm the release scope.' },
  { time: '00:18', seconds: 18, speaker: 'Speaker 2', text: 'The frontend will be completed Thursday, then we can review the upload experience.' },
  { time: '00:32', seconds: 32, speaker: 'Speaker 1', text: 'Let us keep the current sprint scope and document any blockers.' },
  { time: '00:46', seconds: 46, speaker: 'Speaker 3', text: 'I will share the action items and confirm the final review owner.' }
]

export function makeExport(meeting, format, transcript, speakers) {
  const title = meeting.title || 'Meeting'
  const body =
    `${title}\nDate: ${meeting.date}\nDuration: ${meeting.duration}\nParticipants: ${meeting.attendees}\n\nSUMMARY\n${
      meeting.summary || 'No summary available'
    }\n\nTRANSCRIPT\n` +
    transcript.map(t => `${t.time} ${speakers[t.speaker] || t.speaker}: ${t.text}`).join('\n')

  if (format === 'json') {
    return JSON.stringify(
      {
        meeting,
        summary: meeting.summary,
        transcript: transcript.map(t => ({ ...t, speaker: speakers[t.speaker] || t.speaker }))
      },
      null,
      2
    )
  }
  if (format === 'csv') {
    return (
      'time,speaker,text\n' +
      transcript
        .map(t => `"${t.time}","${speakers[t.speaker] || t.speaker}","${t.text.replaceAll('"', '""')}"`)
        .join('\n')
    )
  }
  if (format === 'srt' || format === 'vtt') {
    const stamp = s => `00:00:${String(s).padStart(2, '0')}.000`
    return (
      (format === 'vtt' ? 'WEBVTT\n\n' : '') +
      transcript
        .map(
          (t, i) =>
            `${format === 'srt' ? i + 1 + '\n' : ''}${stamp(t.seconds)} --> ${stamp(
              t.seconds + 5
            )}\n${speakers[t.speaker] || t.speaker}: ${t.text}`
        )
        .join('\n\n')
    )
  }
  return body
}
