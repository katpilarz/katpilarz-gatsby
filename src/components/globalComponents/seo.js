import React from "react"
import {useStaticQuery, graphql} from "gatsby"

/**
 * Rendered through Gatsby's Head API (`export const Head` in a page or
 * template), which replaces react-helmet. Everything returned here is placed
 * in <head> by Gatsby.
 */
const Seo = ({title, description, keywords = [], overview, pathname}) => {
  const {site, sanitySeo} = useStaticQuery(graphql`
    query DefaultSeoQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
      sanitySeo(_id: {eq: "2b913895-10d9-472b-8d7a-30dd2c56e4ed"}) {
        title
        name
        author
        description
        keywords
        contact
        url
        socialMediaImage {
          alt
          asset {
            url
          }
        }
      }
    }
  `)

  const siteUrl = site?.siteMetadata?.siteUrl || ""
  const seo = sanitySeo || {}

  const metaTitle = title || seo.title || ""
  const metaDescription = description || seo.description || ""
  const metaKeywords = keywords.length ? keywords : seo.keywords || []
  const metaImage = seo.socialMediaImage?.asset?.url
  const canonical = pathname ? `${siteUrl}${pathname}` : siteUrl

  // The site title stands alone; every other page gets a suffix.
  const fullTitle = metaTitle === seo.title || !overview ? metaTitle : `${metaTitle} | ${overview}`

  return (
    <>
      <title>{fullTitle}</title>
      <link rel="canonical" href={canonical} />
      <meta name="description" content={metaDescription} />
      {metaKeywords.length > 0 && <meta name="keywords" content={metaKeywords.join(", ")} />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={seo.author || seo.name || ""} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      {metaImage && <meta property="og:image" content={metaImage} />}
      {metaImage && seo.socialMediaImage?.alt && (
        <meta property="og:image:alt" content={seo.socialMediaImage.alt} />
      )}

      <meta name="twitter:card" content={metaImage ? "summary_large_image" : "summary"} />
      <meta name="twitter:creator" content={seo.author || ""} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {metaImage && <meta name="twitter:image" content={metaImage} />}
    </>
  )
}

export default Seo
