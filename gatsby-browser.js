/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

const React = require('react')
const Layout = require('./src/components/layout').default

exports.wrapPageElement = ({element, props}) => <Layout {...props}>{element}</Layout>
