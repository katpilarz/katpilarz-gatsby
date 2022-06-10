require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const clientConfig = require('./client-config')

//const token = process.env.SANITY_READ_TOKEN

const isProd = process.env.NODE_ENV === 'production'



module.exports = {
  siteMetadata: {
    title: `katgolek portfolio site`,
    siteUrl: `https://silver-centaur-b76c67.netlify.app`
  },
  plugins: [{
    resolve: 'gatsby-source-sanity',
    options: {
      ...clientConfig.sanity,
      //token,
      watchMode: !isProd,
      overlayDrafts: !isProd /*&& token*/
    }
  }, "gatsby-plugin-sass", "gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }]
};