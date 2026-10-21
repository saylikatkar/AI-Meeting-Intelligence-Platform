import { useEffect, useState } from 'react'
import { ThemeContext } from './theme'

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('meetingintel_theme') || 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    try {
      localStorage.setItem('meetingintel_theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      }
    } catch {
      // storage unavailable (private mode etc.) - ignore
    }
  }, [theme])

  function toggleTheme() {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  function setTheme(t) {
    setThemeState(t)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
