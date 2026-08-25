/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

const React = require('react')
const Layout = require('./src/components/layout').default

/**
 * Replaces the abandoned `gatsby-plugin-dark-mode`. Runs before the page
 * paints so the stored theme is applied without a flash of the wrong mode,
 * and exposes the same `window.__theme` / `__setPreferredTheme` /
 * `__onThemeChange` contract that `useTheme` subscribes to.
 */
const THEME_SCRIPT = `(function () {
  try {
    var stored = null
    try { stored = window.localStorage.getItem('theme') } catch (e) {}
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    var theme = stored || (prefersDark ? 'dark' : 'light')

    function apply(next) {
      window.__theme = next
      document.body.classList.toggle('dark', next === 'dark')
      document.body.classList.toggle('light', next !== 'dark')
    }

    window.__setPreferredTheme = function (next) {
      apply(next)
      try { window.localStorage.setItem('theme', next) } catch (e) {}
      if (window.__onThemeChange) window.__onThemeChange(next)
    }

    apply(theme)
  } catch (e) {}
})()`

exports.wrapPageElement = ({element, props}) => <Layout {...props}>{element}</Layout>

exports.onRenderBody = ({setPreBodyComponents, setHeadComponents}) => {
  setHeadComponents([
    <link
      key="preload-scholastyca"
      rel="preload"
      href="/fonts/ScholastycaTypeface-Regular.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
  ])

  setPreBodyComponents([
    <script key="theme" dangerouslySetInnerHTML={{__html: THEME_SCRIPT}} />,
  ])
}
