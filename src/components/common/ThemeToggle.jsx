import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../ThemeContext'

export function ThemeToggle({ className = '', compact = false }) {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle-btn ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <>
          <Sun size={15} />
          {!compact && <span>Light Mode</span>}
        </>
      ) : (
        <>
          <Moon size={15} />
          {!compact && <span>Dark Mode</span>}
        </>
      )}
    </button>
  )
}
