/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

const React = require('react')
const Layout = require('./src/components/layout').default
const ErrorBoundary = require("./src/components/globalComponents/errorBoundary").default

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
    /* The PAISAK4U mark, so the practice and the portfolio share a favicon.
     * gatsby-plugin-manifest injects its own icon links from the PWA icon set;
     * these are more specific, so browsers prefer them for the tab. The files
     * are copied verbatim from paisak4u/public into static/. */
    <link key="favicon-ico" rel="icon" href="/favicon.ico" sizes="any" />,
    <link key="favicon-32" rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />,
    <link key="favicon-16" rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />,
    <link key="apple-touch-icon" rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />,
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

// Above the page tree, so it also catches errors thrown while the previous
// page is being unmounted during a client-side navigation.
exports.wrapRootElement = ({element}) => <ErrorBoundary>{element}</ErrorBoundary>
