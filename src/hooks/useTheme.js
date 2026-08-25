import {useCallback, useEffect, useState} from 'react'

/**
 * Replaces `ThemeToggler` from the abandoned `gatsby-plugin-dark-mode`.
 * The globals it reads are set by the pre-body script in `gatsby-ssr.js`.
 */
export default function useTheme() {
  const [theme, setTheme] = useState(null)

  useEffect(() => {
    setTheme(window.__theme)
    window.__onThemeChange = setTheme
    return () => {
      window.__onThemeChange = null
    }
  }, [])

  const toggleTheme = useCallback((next) => {
    if (typeof window !== 'undefined' && window.__setPreferredTheme) {
      window.__setPreferredTheme(next)
    }
  }, [])

  return {theme, toggleTheme}
}
