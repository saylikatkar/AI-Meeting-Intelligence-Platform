import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export function Brand({ light = false, subtitle = true }) {
  return (
    <Link to="/" className={`brand ${light ? 'brand-light' : ''}`}>
      <span className="brand-mark">
        <Sparkles size={18} />
      </span>
      <div className="brand-text-col">
        <span className="brand-title">
          Meeting<span className="brand-accent">Intel</span>
        </span>
        {subtitle && <span className="brand-subtitle">AI MEETING INTELLIGENCE</span>}
      </div>
    </Link>
  )
}
