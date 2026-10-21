import React, { useState } from 'react'
import { Check, CircleHelp, FileAudio, ShieldCheck, Upload, X } from 'lucide-react'
import { PageHeading } from '../../components/ui/PageHeading'

export function UploadPage({ onUploaded }) {
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [drag, setDrag] = useState(false)
  const [saved, setSaved] = useState(false)

  function pick(f) {
    setError('')
    setSaved(false)
    if (!f) return
    const allowed = ['mp3', 'wav', 'm4a', 'aac', 'mp4', 'mov', 'mkv', 'webm']
    const ext = f.name.split('.').pop().toLowerCase()
    if (!allowed.includes(ext)) {
      return setError('Unsupported format. Choose MP3, WAV, M4A, AAC, MP4, MOV, MKV, or WebM.')
    }
    if (f.size > 500 * 1024 * 1024) {
      return setError('File is larger than 500 MB. Choose a smaller recording.')
    }
    setFile(f)
  }

  function submit() {
    if (!file) return setError('Choose a recording before continuing.')
    onUploaded(file)
    setSaved(true)
  }

  return (
    <>
      <PageHeading
        eyebrow="MEETING WORKSPACE"
        title="Upload a meeting"
        description="Choose a recording to prepare it for meeting intelligence."
      />
      <div className="upload-layout">
        <section className="panel upload-panel">
          <div
            className={`dropzone ${drag ? 'dragging' : ''}`}
            onDragOver={e => {
              e.preventDefault()
              setDrag(true)
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={e => {
              e.preventDefault()
              setDrag(false)
              pick(e.dataTransfer.files?.[0])
            }}
          >
            <span className="upload-art">
              <Upload size={25} />
            </span>
            <h2>Drop your recording here</h2>
            <p>or browse files from your computer</p>
            <label className="btn btn-secondary browse-btn">
              Browse files
              <input
                type="file"
                accept=".mp3,.wav,.m4a,.aac,.mp4,.mov,.mkv,.webm,audio/*,video/*"
                onChange={e => pick(e.target.files?.[0])}
              />
            </label>
            <small>Audio or video · Up to 500 MB</small>
          </div>

          {file && (
            <div className="selected-file">
              <span className="file-icon">
                <FileAudio size={20} />
              </span>
              <span>
                <b>{file.name}</b>
                <small>{(file.size / 1024 / 1024).toFixed(2)} MB · Selected locally</small>
              </span>
              <button className="icon-btn" onClick={() => setFile(null)}>
                <X size={17} />
              </button>
            </div>
          )}

          {error && <div className="form-error" style={{ marginTop: 14 }}>{error}</div>}

          {saved && (
            <div className="success-inline">
              <Check size={16} /> File selected and added to local meeting list. Transcription will
              begin when a backend service is connected.
            </div>
          )}

          <div className="upload-actions">
            <button className="btn btn-primary" onClick={submit} disabled={!file}>
              <Upload size={17} /> Add to meeting list
            </button>
            <span>
              <ShieldCheck size={14} /> File stays in this browser session
            </span>
          </div>
        </section>

        <section className="panel upload-guide">
          <h2>What happens next?</h2>
          <p className="muted">The intended processing flow for the connected application.</p>
          {[
            ['01', 'Upload recording', 'Validate file type and size.'],
            ['02', 'Transcribe audio', 'Generate a timestamped transcript.'],
            ['03', 'Analyze conversation', 'Extract summary, decisions and tasks.'],
            ['04', 'Review insights', 'Search and export meeting results.']
          ].map(([n, t, d], i) => (
            <div className="pipeline-step" key={n}>
              <span className={`pipeline-number ${i === 0 ? 'current' : ''}`}>{n}</span>
              <div>
                <b>{t}</b>
                <small>{d}</small>
              </div>
              {i === 0 && <span className="pipeline-now">Ready</span>}
            </div>
          ))}
          <div className="notice-card">
            <CircleHelp size={17} />
            <p>
              File selection and validation work locally. Transcription and AI analysis will begin
              when the processing service is connected.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
