import * as React from "react"
import { graphql } from "gatsby";
import Seo from "../components/seo";
import Banner from "../components/banner";
import GallerySwiper from "../components/gallerySwiper";
import ProjectsFeatured from "../components/projectsFeatured";
import SectionFocus from "../components/sectionFocus";
import SectionContact from "../components/sectionContact";
import GalleryArchives from "../components/galleryArchives";




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
      banner {
        header
        mockups {
          alt
          asset {
            gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
      }
      section {
        focusAreas {
          text
          image {
            alt
            asset {
              gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }
        }
        mockups {
          alt
          asset {
            gatsbyImageData(layout: FULL_WIDTH, formats: WEBP, placeholder: BLURRED)
          }
        }
      }
      archiveGallery {
        alt
        asset {
          gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: BLURRED)
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
  const sectionFocus = (data || {}).home.section;
  const galleryImages = (data || {}).galleryMockups.edges;
  const archiveImages = (data || {}).home.archiveGallery;

  console.log({galleryImages})


  if (errors) {
    return (
      <h1>Something went wrong</h1>
    );
  }

  return (
    <>
    <Seo title={site.title} description={site.description} keywords={site.keywords}  />
    <main>
      
    <Banner name={site.name} banner={home.banner}/>
    <GallerySwiper images={galleryImages}/>
    <SectionFocus section={sectionFocus}/>
    <ProjectsFeatured featuredProjects={featuredProjects}/>
    <SectionContact/>
    <GalleryArchives images={archiveImages}/>
    </main>
    </>
  )
}

export default IndexPage
