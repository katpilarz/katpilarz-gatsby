require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const siteUrl = process.env.URL || `https://www.katgolek.eu`

const clientConfig = require('./client-config')

//const token = process.env.SANITY_READ_TOKEN

const isProd = process.env.NODE_ENV === 'production'
const previewEnabled = (process.env.GATSBY_IS_PREVIEW || "false").toLowerCase() === "true"



module.exports = {
  siteMetadata: {
    siteUrl:`https://www.katgolek.eu`,
  },
  plugins: [{
    resolve: 'gatsby-source-sanity',
    options: {
      ...clientConfig.sanity,
      /*token*/
      watchMode: !isProd,
      overlayDrafts: !isProd /*&& token*/
    }
  },
  {
    resolve: "gatsby-plugin-web-font-loader",
    options: {
      google: {
        families: ["Outfit"],
      },
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: 'Katarzyna Gołek',
      short_name: 'katgolek',
      start_url: '/',
      background_color: '#F8F8F8',
      theme_color: '#1E6DB6',
      display: 'standalone',
      icon: 'src/assets/images/favicon.png',
      cache_busting_mode: 'none',
      icons: [
        {
          src: "src/assets/images/maskable_icon_x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable"
        },
        {
          src: "src/assets/images/maskable_icon_x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any maskable"
        }
      ],
    },
  },
  {
    resolve: 'gatsby-plugin-offline',
    options: {
       /*workboxConfig: {
          globPatterns: ['src/assets/images/favicon.png']
       },*/
       precachePages: [`/services/*`, `/projects/*`, `/faqs/`],
    }
 },
 
{
  resolve: "gatsby-plugin-robots-txt",
  options: {
    host: "https://www.katgolek.eu",
    sitemap: "https://www.katgolek.eu/sitemap-index.xml",
    policy: [{ userAgent: "*", allow: "/" }],
  },
},
{
  resolve: "gatsby-plugin-sitemap",
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
    resolvePages: ({
      allSitePage: { nodes: allPages },
    }) => {

      return allPages.map(page => {
        return { ...page}
      })
    },
    serialize: ({ path}) => {
      return {
        url: path,
        changefreq: `weekly`,
        priority: 0.5,
      }
    },
  },
},
/* THIS SHOULD BE UPDATED IN THE FUTURE => CHECK DOCS */ 
/*
  {
  resolve: "gatsby-plugin-sitemap",
  options: {
    query: `
    {
      allSitePage {
        nodes {
          path
        }
      }
      allSanityProject{
          nodes {
              slug {
                current
            }
          }
        }
    }
  `,
    resolveSiteUrl: () => siteUrl,
    resolvePages: ({
      allSitePage: { nodes: allPages },
      allSanityProject: { nodes: allSanityProjectNodes },
    }) => {
      const allSanityProjectNodesMap = allSanityProjectNodes.reduce((acc, node) => {
        const { slug } = node.slug.current
        acc[slug] = node.slug.current

        return acc
      }, {})

      return allPages.map(page => {
        return { ...page, ...allSanityProjectNodesMap[page.path] }
      })
    },
    serialize: ({ path}) => {
      return {
        url:path,
        changefreq: `weekly`,
        priority: 0.7,
      }
    },
  },
},*/
  `gatsby-plugin-transition-link`,
  "gatsby-plugin-dark-mode",
  "gatsby-plugin-sass",
  "gatsby-plugin-image",
  "gatsby-plugin-react-helmet",
  "gatsby-plugin-sitemap",
  "gatsby-plugin-sharp",
  "gatsby-transformer-sharp",
{
  resolve: 'gatsby-source-filesystem',
  options: {
    "name": "images",
    "path": "./src/assets/images/", 
    "name": "fonts",
    "path": `${__dirname}/static/fonts`, 

    
  },
  __key: "images",
},
  
]
};