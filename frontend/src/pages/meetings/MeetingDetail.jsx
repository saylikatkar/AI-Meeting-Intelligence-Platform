import { useState } from 'react'
import { Activity, ArrowDownToLine, ArrowLeft, ArrowRight, Check, CheckCheck, Clock3, FileText, ListTodo, MessageSquareText, Mic2, Play, Search, Sparkles, Users, X } from 'lucide-react'
import { sampleTranscript, makeExport } from '../../utils/exports'
import { PageHeading } from '../../components/ui/PageHeading'
import { Status } from '../../components/ui/Status'
import { ActionItems } from '../workspace/ActionItems'

export function MeetingDetail({ meeting, onBack, onDelete }) {
  const [tab, setTab] = useState('Overview')
  const [question, setQuestion] = useState('')
  const [asked, setAsked] = useState(false)
  const [transcript, setTranscript] = useState(sampleTranscript)
  const [speakers, setSpeakers] = useState({
    'Speaker 1': 'Speaker 1',
    'Speaker 2': 'Speaker 2',
    'Speaker 3': 'Speaker 3'
  })
  const [search, setSearch] = useState('')
  const [exportType, setExportType] = useState('pdf')
  const [retry, setRetry] = useState(false)

  if (!meeting) {
    return (
      <section className="panel empty-state">
        <FileText size={26} />
        <b>Meeting not found</b>
        <button className="btn btn-secondary" onClick={onBack}>
          Back to meetings
        </button>
      </section>
    )
  }

  const visibleTranscript = transcript.filter(t =>
    (t.text + ' ' + (speakers[t.speaker] || t.speaker)).toLowerCase().includes(search.toLowerCase())
  )

  function download() {
    const text = makeExport(meeting, exportType, transcript, speakers)
    if (exportType === 'pdf') {
      const w = window.open('', '_blank', 'width=900,height=700')
      if (!w) {
        alert('Allow pop-ups to print this meeting report as PDF.')
        return
      }
      w.document.write(
        `<html><head><title>${meeting.title}</title><style>body{font:14px Arial;padding:32px;color:#222}h1,h2{color:#5246ea}pre{white-space:pre-wrap;font:13px Arial;line-height:1.6}</style></head><body><h1>${meeting.title}</h1><pre>${text
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')}</pre><script>window.onload=()=>window.print()</script></body></html>`
      )
      w.document.close()
      return
    }
    const ext = exportType === 'docx' ? 'doc' : exportType
    const payload =
      exportType === 'docx'
        ? `<html><body><h1>${meeting.title}</h1><pre>${text
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')}</pre></body></html>`
        : text
    const mime = exportType === 'docx' ? 'application/msword' : 'text/plain;charset=utf-8'
    const blob = new Blob([payload], { type: mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${meeting.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.${ext}`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    if (exportType === 'docx') {
      alert('Downloaded a Word-compatible .doc file. A true .docx package requires an export library or backend.')
    }
  }

  function answer() {
    setAsked(true)
  }

  return (
    <>
      <button className="back-link" onClick={onBack}>
        <ArrowLeft size={16} /> Back to meetings
      </button>
      <PageHeading
        eyebrow={`MEETING · ${meeting.id}`}
        title={meeting.title}
        description={`${meeting.date} · ${meeting.duration} · ${meeting.attendees} attendees`}
        action={
          <div className="inline-actions">
            <select
              className="export-select"
              value={exportType}
              onChange={e => setExportType(e.target.value)}
              aria-label="Export format"
            >
              <option value="pdf">PDF report</option>
              <option value="docx">DOCX</option>
              <option value="txt">TXT</option>
              <option value="json">JSON</option>
              <option value="srt">SRT subtitles</option>
              <option value="vtt">VTT subtitles</option>
              <option value="csv">CSV transcript</option>
            </select>
            <button className="btn btn-secondary" onClick={download}>
              <ArrowDownToLine size={16} /> Export
            </button>
            <button className="btn btn-secondary danger-button" onClick={() => onDelete(meeting)}>
              <X size={16} /> Delete
            </button>
          </div>
        }
      />

      <div className="meeting-detail-top">
        <div className="media-placeholder">
          <div className="media-play">
            <Play size={25} fill="currentColor" />
          </div>
          <b>Recording preview</b>
          <span>Media playback becomes available when recording storage is connected.</span>
          <div className="media-track">
            <i />
          </div>
          <div className="media-time">
            <span>00:00</span>
            <span>{meeting.duration}</span>
          </div>
        </div>

        <div className="panel meeting-summary">
          <div className="panel-heading">
            <div>
              <h2>
                <Sparkles size={17} /> Executive summary
              </h2>
              <p>Summary shown from illustrative data</p>
            </div>
            <Status status={meeting.status} />
          </div>
          <p>{meeting.summary || 'Summary will appear after processing.'}</p>
          <div className="summary-meta">
            <span>
              <Users size={15} /> {meeting.attendees} attendees
            </span>
            <span>
              <Clock3 size={15} /> {meeting.duration}
            </span>
          </div>
        </div>
      </div>

      <section className="panel detail-tabs-panel">
        <div className="tabs tabs-scroll">
          {[
            'Overview',
            'Transcript',
            'Summary & intelligence',
            'Action items',
            'Ask AI',
            'Processing'
          ].map(t => (
            <button
              key={t}
              onClick={() => {
                setTab(t)
                setAsked(false)
              }}
              className={tab === t ? 'tab-active' : ''}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'Overview' && (
          <div className="detail-content">
            <h2>Meeting overview</h2>
            <p className="muted">Review the main discussion, decisions, and follow-ups.</p>
            <div className="insight-grid">
              <div className="insight-box">
                <span className="insight-box-icon violet">
                  <Sparkles size={18} />
                </span>
                <b>Key discussion</b>
                <p>Team alignment, delivery priorities, and open implementation questions.</p>
              </div>
              <div className="insight-box">
                <span className="insight-box-icon green">
                  <CheckCheck size={18} />
                </span>
                <b>Decisions</b>
                <p>Keep the current sprint scope and review the upload experience before release.</p>
              </div>
              <div className="insight-box">
                <span className="insight-box-icon orange">
                  <ListTodo size={18} />
                </span>
                <b>Final decision</b>
                <p>Complete the frontend review before the next release checkpoint.</p>
              </div>
            </div>
            <h3 style={{ marginTop: 24, fontSize: 14 }}>Unresolved questions</h3>
            <p className="muted">Confirm final acceptance criteria and agree on the review owner.</p>
          </div>
        )}

        {tab === 'Transcript' && (
          <div className="detail-content">
            <div className="section-heading-row">
              <h2>
                <MessageSquareText size={19} /> Timestamped transcript
              </h2>
              <div className="search-box transcript-search">
                <Search size={15} />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search transcript..."
                />
              </div>
            </div>
            <p className="muted">
              Sample transcript for interface preview. Click a timestamp to navigate.
            </p>
            <div className="transcript-list">
              {visibleTranscript.map(t => (
                <article className="transcript-line" key={t.time}>
                  <button
                    className="timestamp-chip"
                    onClick={() =>
                      document
                        .getElementById(`transcript-${t.time}`)
                        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }
                  >
                    {t.time}
                  </button>
                  <div id={`transcript-${t.time}`} className="transcript-text">
                    <label>
                      Speaker name
                      <input
                        value={speakers[t.speaker] || t.speaker}
                        onChange={e =>
                          setSpeakers(prev => ({ ...prev, [t.speaker]: e.target.value }))
                        }
                        aria-label={`Rename ${t.speaker}`}
                      />
                    </label>
                    <textarea
                      value={t.text}
                      onChange={e =>
                        setTranscript(prev =>
                          prev.map(x => (x.time === t.time ? { ...x, text: e.target.value } : x))
                        )
                      }
                      aria-label={`Transcript text at ${t.time}`}
                      rows={2}
                    />
                  </div>
                </article>
              ))}
              {!visibleTranscript.length && (
                <div className="empty-state">No transcript matches “{search}”.</div>
              )}
            </div>
            <div className="notice-card">
              <Mic2 size={17} />
              <p>
                These example segments demonstrate transcript search, timestamp navigation,
                speaker renaming, and manual correction. Real transcription requires the backend.
              </p>
            </div>
          </div>
        )}

        {tab === 'Summary & intelligence' && (
          <div className="detail-content">
            <h2>Meeting intelligence</h2>
            <div className="insight-grid">
              <div className="insight-box">
                <b>Summary</b>
                <p>{meeting.summary || 'Summary will be generated after processing.'}</p>
              </div>
              <div className="insight-box">
                <b>Key points</b>
                <p>
                  Release scope confirmed; upload experience needs review; blockers must be
                  documented.
                </p>
              </div>
              <div className="insight-box">
                <b>Decisions</b>
                <p>Maintain the sprint scope and confirm the final review owner.</p>
              </div>
            </div>
            <h3 style={{ marginTop: 24, fontSize: 14 }}>Final decision</h3>
            <p className="muted">
              The team will finish the frontend review before the release checkpoint.
            </p>
            <h3 style={{ marginTop: 20, fontSize: 14 }}>Unresolved questions, risks and blockers</h3>
            <ul style={{ color: 'var(--muted)', fontSize: 12, paddingLeft: 20, lineHeight: 1.7 }}>
              <li>Confirm acceptance criteria.</li>
              <li>Assign a final review owner.</li>
            </ul>
          </div>
        )}

        {tab === 'Action items' && (
          <div className="detail-content">
            <ActionItems compactMeeting={meeting.title} />
          </div>
        )}

        {tab === 'Ask AI' && (
          <div className="detail-content" style={{ maxWidth: 840, margin: '0 auto' }}>
            <h2>
              <Sparkles size={18} /> Ask about this meeting
            </h2>
            <p className="muted">
              Questions are demonstrated against sample transcript content. Real AI answers require
              the backend service.
            </p>
            <div className="suggested-questions">
              {[
                'What was the final decision?',
                'Who owns the frontend?',
                'What deadline was agreed?',
                'What remains unresolved?'
              ].map(q => (
                <button
                  key={q}
                  className="btn btn-secondary"
                  onClick={() => {
                    setQuestion(q)
                    setAsked(false)
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
            <form
              className="ask-form"
              onSubmit={e => {
                e.preventDefault()
                answer()
              }}
            >
              <input
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="Ask a question about this meeting…"
                required
              />
              <button className="btn btn-primary" aria-label="Ask question">
                <ArrowRight size={17} />
              </button>
            </form>
            {asked && (
              <div className="answer-card">
                <b>Sample answer</b>
                <p>
                  {/final decision/i.test(question)
                    ? 'The team will complete the frontend review before the release checkpoint.'
                    : /who|owner|responsible/i.test(question)
                    ? 'Speaker 2 discussed finishing the frontend by Thursday; the final owner still needs confirmation.'
                    : /deadline|when/i.test(question)
                    ? 'The frontend was planned for Thursday, according to the sample transcript at 00:18.'
                    : 'The team needs to confirm acceptance criteria and the final review owner.'}
                </p>
                <button
                  className="timestamp-chip"
                  onClick={() => {
                    setTab('Transcript')
                    setSearch('frontend')
                  }}
                >
                  Source: 00:18 · View transcript
                </button>
                <p className="muted" style={{ fontSize: 10, marginTop: 10 }}>
                  Illustrative response only; no external AI request was sent.
                </p>
              </div>
            )}
          </div>
        )}

        {tab === 'Processing' && (
          <div className="detail-content">
            <h2>Processing tracker</h2>
            <p className="muted">
              Stage statuses are local preview states until the processing API is connected.
            </p>
            <div className="processing-steps">
              {[
                ['Upload received', 'File selected and validated'],
                ['Audio extraction', 'Prepare audio track'],
                ['Transcription', 'Generate timestamped speech'],
                ['Speaker identification', 'Label and correct speakers'],
                ['AI analysis', 'Summary, decisions and tasks'],
                ['Ready to review', 'Meeting report and exports']
              ].map(([title, desc], i) => (
                <div
                  className={`processing-step ${
                    i === 0 || meeting.status === 'Completed'
                      ? 'step-done'
                      : i === 1 && retry
                      ? 'step-current'
                      : ''
                  }`}
                  key={title}
                >
                  <span>{i === 0 || meeting.status === 'Completed' ? <Check size={15} /> : i + 1}</span>
                  <div>
                    <b>{title}</b>
                    <small>{desc}</small>
                  </div>
                  <em>
                    {i === 0 || meeting.status === 'Completed'
                      ? 'Completed'
                      : meeting.status === 'Failed'
                      ? 'Failed'
                      : i === 1 && retry
                      ? 'Retry queued'
                      : 'Waiting'}
                  </em>
                </div>
              ))}
            </div>
            {meeting.status === 'Failed' && (
              <button
                className="btn btn-primary"
                style={{ marginTop: 18 }}
                onClick={() => setRetry(true)}
              >
                <Activity size={16} /> {retry ? 'Retry requested' : 'Retry processing'}
              </button>
            )}
            {retry && (
              <p className="success-inline">
                Retry request recorded in this browser preview. Backend processing is not connected.
              </p>
            )}
          </div>
        )}
      </section>
    </>
  )
}
