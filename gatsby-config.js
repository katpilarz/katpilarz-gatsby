require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const siteUrl = process.env.URL || `https://www.katarzynapilarz.eu/`;
const clientConfig = require("./client-config");
const isProd = process.env.NODE_ENV === "production";
const previewEnabled = (process.env.GATSBY_IS_PREVIEW || "false").toLowerCase() === "true";

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.katarzynapilarz.eu/",
  },
  plugins: [
    {
      resolve: "gatsby-source-sanity",
      options: {
        ...clientConfig.sanity,
        watchMode: !isProd,
        overlayDrafts: !isProd,
      },
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
        name: "Katarzyna Pilarz",
        short_name: "paisak4u",
        start_url: "/",
        background_color: "#F8F8F8",
        theme_color: "#1E6DB6",
        display: "standalone",
        icon: "src/assets/images/favicon.png",
        cache_busting_mode: "none",
        icons: [
          {
            src: "src/assets/images/maskable_icon_x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "src/assets/images/maskable_icon_x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
        precachePages: [`/services/*`, `/projects/*`, `/faqs/`],
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://www.katarzynapilarz.eu",
        sitemap: "https://www.katarzynapilarz.eu/sitemap.xml",
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
        resolvePages: ({ allSitePage: { nodes: allPages } }) => {
          return allPages.map((page) => ({
            url: page.path,
          }));
        },
        serialize: ({ url }) => ({
          url,
          changefreq: `weekly`,
          priority: 0.5,
        }),
      },
    },
    "gatsby-plugin-transition-link",
    "gatsby-plugin-dark-mode",
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: [
        {
          name: "images",
          path: "./src/assets/images/",
        },
        {
          name: "fonts",
          path: `${__dirname}/static/fonts`,
        },
      ],
    },
  ],
};
