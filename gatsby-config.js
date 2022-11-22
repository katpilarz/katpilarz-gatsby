require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const clientConfig = require('./client-config')

//const token = process.env.SANITY_READ_TOKEN

const isProd = process.env.NODE_ENV === 'production'
const previewEnabled = (process.env.GATSBY_IS_PREVIEW || "false").toLowerCase() === "true"



module.exports = {
  siteMetadata: {
    siteUrl:`https://kategolek.netlify.app`,
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
    },
  },
  `gatsby-plugin-transition-link`,
  "gatsby-plugin-dark-mode",
  "gatsby-plugin-sass",
  "gatsby-plugin-image",
  "gatsby-plugin-react-helmet",
  "gatsby-plugin-sitemap",
  "gatsby-plugin-sharp",
  "gatsby-transformer-sharp", {
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