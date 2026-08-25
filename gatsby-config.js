require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
  // dotenv v17 prints a promotional tip line on every load without this.
  quiet: true,
})

const clientConfig = require('./client-config')

// Single source of truth for the canonical origin. `www` redirects to the
// apex, so the apex is what we advertise everywhere: siteMetadata, sitemap,
// robots.txt and the canonical link tag.
const siteUrl = process.env.URL || 'https://katarzynapilarz.com.pl'

const isProd = process.env.NODE_ENV === 'production'

// Optional. Only a token lets the source plugin read drafts, so overlaying
// them without one just warns and does nothing.
const token = process.env.SANITY_READ_TOKEN

module.exports = {
  siteMetadata: {
    siteUrl,
  },
  plugins: [
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token,
        watchMode: !isProd,
        overlayDrafts: !isProd && Boolean(token),
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
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        sassOptions: {
          // gatsby-plugin-sass pins sass-loader at v10, which still calls Dart
          // Sass's legacy JS API. That call is upstream and not something this
          // project can change, so silence just that one deprecation rather
          // than let it bury real warnings. Our own stylesheets use
          // @use/@forward, so no other deprecations are suppressed.
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ],
}
