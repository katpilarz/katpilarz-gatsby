import React, { useEffect, useState } from "react"
import * as styles from "./cookieConsent.module.scss"

const GA_ID = "G-K2FJXTD2M6"
const STORAGE_KEY = "kp-analytics-consent"

/* Analytics load only after the visitor accepts: nothing is injected on a
   plain visit, and a declined choice is remembered without loading anything. */
const loadGtag = () => {
  if (typeof window === "undefined" || window.kpGtagLoaded) return
  window.kpGtagLoaded = true

  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag() { window.dataLayer.push(arguments) }
  window.gtag = gtag
  gtag("js", new Date())
  gtag("config", GA_ID, { anonymize_ip: true })
}

const readChoice = () => {
  try { return window.localStorage.getItem(STORAGE_KEY) } catch { return null }
}

const saveChoice = (value) => {
  try { window.localStorage.setItem(STORAGE_KEY, value) } catch { /* private mode */ }
}

const CookieConsent = () => {
  // Rendered only after mount so server and first client render agree.
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const choice = readChoice()
    if (choice === "granted") loadGtag()
    else if (choice !== "denied") setVisible(true)
  }, [])

  if (!visible) return null

  const decide = (granted) => {
    saveChoice(granted ? "granted" : "denied")
    setVisible(false)
    if (granted) loadGtag()
  }

  return (
    <aside className={styles.consent} role="dialog" aria-modal="false" aria-label="Cookie consent">
      <p className={`${styles.consentLabel} text-uppercase`}>Cookies</p>
      <p className={styles.consentText}>
        I use Google Analytics to understand how visitors use this site.
        It loads only if you accept — no cookies are set before that.
      </p>
      <div className={styles.consentActions}>
        <button className={`${styles.accept} text-uppercase`} onClick={() => decide(true)}>
          Accept
        </button>
        <button className={`${styles.decline} text-uppercase`} onClick={() => decide(false)}>
          Decline
        </button>
      </div>
    </aside>
  )
}

export default CookieConsent
