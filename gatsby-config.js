require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

const clientConfig = require('./client-config')

// Single source of truth for the canonical origin. `www` redirects to the
// apex, so the apex is what we advertise everywhere: siteMetadata, sitemap,
// robots.txt and the canonical link tag.
const siteUrl = process.env.URL || 'https://katarzynapilarz.com.pl'

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  siteMetadata: {
    siteUrl,
  },
  plugins: [
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        watchMode: !isProd,
        overlayDrafts: !isProd,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Katarzyna Pilarz',
        short_name: 'kpilarz',
        start_url: '/',
        background_color: '#F8F8F8',
        theme_color: '#1E6DB6',
        display: 'standalone',
        icon: 'src/assets/images/favicon.png',
        cache_busting_mode: 'none',
        icons: [
          {
            src: 'src/assets/images/maskable_icon_x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'src/assets/images/maskable_icon_x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap-index.xml`,
        policy: [{userAgent: '*', allow: '/'}],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
          {
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({allSitePage: {nodes}}) => nodes,
        serialize: ({path}) => ({
          url: path,
          changefreq: 'weekly',
          priority: path === '/' ? 1.0 : 0.7,
        }),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`,
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'fonts',
        path: `${__dirname}/static/fonts`,
      },
      __key: 'fonts',
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ],
}
