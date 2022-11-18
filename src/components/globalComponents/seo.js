import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

function SEO({ description, lang, meta, keywords, title, overview }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription = description || (data.site && data.site.description) || "";
        const siteOverview = (data.site && data.site.overview) || "";
        const siteTitle = (data.site && data.site.title) || "";
        const siteAuthor = (data.site && data.site.author) || "";
        const metaImage = (data.site && data.site.socialMediaImage.asset.url) || "";
        return (
          <Helmet
            htmlAttributes={{ lang }}
            title={title}
            titleTemplate={title === siteTitle ? "%s" : `%s | ${overview}`}
            
            meta={[
              {
                name: "description",
                content: metaDescription
              },
              {
                name: "og-image",
                content: metaImage
              },
              {
                property: "og:title",
                content: title
              },
              {
                property: "og:description",
                content: metaDescription
              },
              {
                property: "og:type",
                content: "website"
              },
              {
                name: "twitter:card",
                content: "summary"
              },
              {
                name: "twitter:creator",
                content: siteAuthor
              },
              {
                name: "twitter:title",
                content: title
              },
              {
                name: "twitter:description",
                content: metaDescription
              },
              {
                name: "twitter-image",
                content: metaImage
              },
            ]
              .concat(
                keywords && keywords.length > 0
                  ? {
                      name: "keywords",
                      content: keywords.join(", ")
                    }
                  : []
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
}

SEO.defaultProps = {
  lang: "en",
  meta: [],
  keywords: []
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired
};

export default SEO;




const detailsQuery  = graphql`
query DefaultSEOQuery{
    site: sanitySeo(_id: {eq: "2b913895-10d9-472b-8d7a-30dd2c56e4ed"}) {
      _id
      id
      url
      title
      name
      keywords
      description
      contact
      author
      image {
        asset {
          url
          gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
        }
        alt
      }
      socialMediaImage {
        alt
        asset {
          url
        }
      }
    }
  }
`