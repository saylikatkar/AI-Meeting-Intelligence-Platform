import { createContext, useContext } from 'react'

export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {}
})

export function useTheme() {
  return useContext(ThemeContext)
}
