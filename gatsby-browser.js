/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// Global stylesheets belong here rather than in a component. Imported from
// Layout they ended up inside per-page component chunks, so their position
// relative to the CSS Modules varied from page to page — which is what
// mini-css-extract-plugin was warning about. From here they land in the app
// bundle and are always applied before any scoped module styles.
//
// Outfit is self-hosted; the local Scholastyca face is declared in
// styles/imports/_typography.scss and preloaded from gatsby-ssr.js.
require("@fontsource-variable/outfit")
require("./src/styles/layout.scss")

const React = require("react")
const Layout = require("./src/components/layout").default
const ErrorBoundary = require("./src/components/globalComponents/errorBoundary").default

exports.wrapPageElement = ({element, props}) => <Layout {...props}>{element}</Layout>

// Above the page tree, so it also catches errors thrown while the previous
// page is being unmounted during a client-side navigation.
exports.wrapRootElement = ({element}) => <ErrorBoundary>{element}</ErrorBoundary>
