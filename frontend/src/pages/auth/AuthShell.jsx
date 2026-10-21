import { AudioLines, Check, Sparkles } from 'lucide-react'
import { ThemeToggle } from '../../components/common/ThemeToggle'
import { Brand } from '../../components/common/Brand'

export function AuthShell({ children }) {
  return (
    <div className="auth-page">
      <aside className="auth-art">
        <div className="auth-art-inner">
          <Brand light />
          <div className="art-copy">
            <span className="eyebrow">
              <Sparkles size={14} /> MEETINGS, MADE MEANINGFUL
            </span>
            <h1>
              Spend less time<br />
              in meetings. More<br />
              <em>time moving forward.</em>
            </h1>
            <p>Turn conversations into clarity with your AI meeting intelligence workspace.</p>
          </div>
          <div className="art-insight">
            <div className="insight-icon">
              <AudioLines size={20} />
            </div>
            <div>
              <b>Meeting intelligence</b>
              <small>One conversation. Clear next steps.</small>
            </div>
            <span className="insight-check">
              <Check size={15} />
            </span>
          </div>
          <div className="art-bottom">
            <span>Built for teams that get things done</span>
            <span>Privacy-first workspace</span>
          </div>
        </div>
      </aside>

      <main className="auth-main">
        <div className="auth-top-actions">
          <ThemeToggle compact />
        </div>
        <div className="auth-mobile-brand">
          <Brand />
        </div>
        <div className="auth-card">
          {children}
          <p className="auth-legal">
            By continuing, you agree to our <a href="#terms">Terms</a> and{' '}
            <a href="#privacy">Privacy Policy</a>.
          </p>
        </div>
        <span className="auth-copyright">© 2026 MeetingIntel · AI Meeting Intelligence</span>
      </main>
    </div>
  )
}
