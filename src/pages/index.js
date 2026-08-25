import * as React from "react"
import { graphql } from "gatsby";
import Seo from "../components/globalComponents/seo";
import HomeSingle from "../components/home/homeSingle";
import PagePreloader from "../components/globalSections/pagePreloader";
import AnimatedBtn from "../components/globalComponents/animatedBtn";
import Header from "../components/globalSections/header";
import Media from "../components/globalComponents/media";
import { useEffect, useState } from 'react';
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
      bannerGallery {
        url
        image {
          alt
          asset {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, formats: WEBP)
          }
        }
      }
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
            cloudinaryVideo {
              url
              secure_url
              format
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
        cloudinaryVideo {
          url
          secure_url
          format
        }
      }
      featuredVideoMobile{
        alt
        cloudinaryVideo {
          url
          secure_url
          format
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
          cloudinaryVideo {
            url
            secure_url
            format
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
      sort: {publishedAt: DESC}
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
      sort: {publishedAt: DESC}
      filter: {isFeatured: {eq: true}}
    ) {
      edges {
        node {
          id
          thumbnailBannerImage {
            alt
            asset {
              gatsbyImageData(formats: WEBP, placeholder: BLURRED, layout: FULL_WIDTH)
              url
            }
          }
          thumbnailSocialMedia {
            alt
            asset {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, formats: WEBP)
            }
          }
          homeFeaturedProjectImage{
            alt
            asset {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, formats: WEBP)
            }
          }
          homeFeaturedProjectImageHover{
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
          thumbnailSocialMedia {
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
    services: allSanityService(sort: {_id: DESC}) {
      edges {
        node {
          title
          slug {
            current
          }
          id
          thumbnail {
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
            cloudinaryVideo {
              url
              secure_url
              format
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

  const [isHome] = useState(true)

  useEffect(() => {
    // Braces matter: an arrow without them implicitly returns whatever
    // scrollTo gives back, and React treats an effect's return value as the
    // cleanup. It only checks `!== undefined`, so any non-function value is
    // called on unmount and throws "destroy is not a function".
    window.scrollTo(0, 0)
  }, []) 

  
  if (errors) {
    return (
      navigate(`/404`)
    );
  }


  return (
    <main>
      <Header isHome={isHome}/>
      <PagePreloader/>
      <Media query="(min-width: 569px)" render={() =>
          (
            <AnimatedBtn isHome={isHome}/>
          )}
        />
      <HomeSingle isHome={isHome} galleryMockups={galleryMockups} home={home} site={site} services={services} testimonialProject={testimonialProject}
      featuredProjects={featuredProjects}/>
    </main>
  )
}

export default IndexPage

export const Head = ({data, location}) => {
  const site = data.site
  return (
    <Seo
      title={`${site.author}: ${site.title}`}
      description={site.description}
      keywords={site.keywords}
      overview={data.home.sectionAbout.header}
      pathname={location.pathname}
    />
  )
}
