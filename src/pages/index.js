import * as React from "react"
import { graphql } from "gatsby";
import Seo from "../components/globalComponents/seo";
import HomeSingle from "../components/home/homeSingle";
import PagePreloader from "../components/globalSections/pagePreloader";
import { useEffect } from 'react';
import { navigate } from 'gatsby';






export const query = graphql`
query HomePageQuery{
    site: sanitySeo(_id: {eq: "2b913895-10d9-472b-8d7a-30dd2c56e4ed"}) {
      title
      description
      keywords
      author
      name
    }
    home:sanityHome {
      sectionFocus {
        header
        subheader
        focusAreas {
          text
          image {
            alt
            asset {
              gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }
          video {
            alt
            fallback {
              asset {
                url
                extension
                altText
              }
            }
            webm {
              asset {
                altText
                url
                extension
              }
            }
          }
        }
      }
      sectionAbout {
        _rawDescription
        header
        subheader
        imageOne {
          alt
          asset {
            gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
        imageTwo {
          alt
          asset {
            gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
      }
      featuredVideo{
        alt
        fallback {
          asset {
            url
            extension
            altText
          }
        }
        webm {
          asset {
            altText
            url
            extension
          }
        }
      }
      gallery {
        ... on SanityFigure {
          _type
          alt
          asset {
            gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH, formats: WEBP)
          }
        }
        ... on SanityPrototype {
          _key
          _type
          fallback {
            asset {
              url
              extension
            }
          }
          webm {
            asset {
              url
              extension
            }
          }
          alt
        }
      }
      sectionContact {
        projectFeatures
        subheader
        headerOne
        headerTwo
        brief {
          asset {
            _type
            url
          }
          text
        }
        image {
          alt
          asset {
            gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
      }

    }
    galleryMockups:allSanityProject(
      filter: {isGalleryMockup: {eq: true}}
      sort: {order: DESC, fields: publishedAt}
      ){
        edges {
          node {
            socialMediaImage {
              alt
              asset {
                gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, formats: WEBP)
              }
            }
            slug {
              current
            }
          }
        }
      }
    projects: allSanityProject(
      sort: {order: DESC, fields: publishedAt}
      filter: {isFeatured: {eq: true}}
    ) {
      edges {
        node {
          id
          bannerImage {
            alt
            asset {
              gatsbyImageData(formats: WEBP, placeholder: BLURRED, layout: FULL_WIDTH)
              url
            }
          }
          socialMediaImage {
            alt
            asset {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, formats: WEBP)
            }
          }
          header
          isFeatured
          overview
          publishedAt(formatString: "YYYY")
          title
          slug {
            current
          }
          services {
            title
          }
          _rawTestimonial
        }
      }
    }
    testimonialProject: allSanityProject(filter: {isFeaturedTestimonial: {eq: true}}) {
      edges {
        node {
          id
          _rawTestimonial
          title
          socialMediaImage {
            alt
            asset {
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH, formats: WEBP)
            }
          }
          services {
            title
          }
          slug {
            current
          }
        }
      }
    }
    services: allSanityService(sort: {fields: _id, order: DESC}) {
      edges {
        node {
          title
          slug {
            current
          }
          id
          image {
            asset {
              url
              gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: BLURRED)
            }
            alt
          }
          video {
            fallback {
              asset {
                url
                extension
                altText
              }
            }
            webm {
              asset {
                altText
                url
                extension
              }
            }
          }
        }
      }
    }
  }
`


// markup
const IndexPage = props => {

  const { data, errors } = props;
  const site = (data || {}).site;
  const featuredProjects = (data || {}).projects.edges;
  const home = (data || {}).home;
  const services = (data || {}).services.edges;
  const testimonialProject =  (data || {}).testimonialProject.edges[0];
  const galleryMockups =  (data || {}).galleryMockups.edges;

  useEffect(() => window.scrollTo(0, 0), []) 

  const siteTitle = site.author + ': ' + site.title

  if (errors) {
    return (
      navigate(`/404`)
    );
  }


  return (
    <main>
      <Seo title={siteTitle} description={site.description} keywords={site.keywords}  />
      <PagePreloader/>
      <HomeSingle galleryMockups={galleryMockups} home={home} site={site} services={services} testimonialProject={testimonialProject}
      featuredProjects={featuredProjects}/>
    </main>
  )
}

export default IndexPage
