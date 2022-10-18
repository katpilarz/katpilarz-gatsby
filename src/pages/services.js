import * as React from "react"
import { graphql } from "gatsby";
import PageSingle from "../components/pageSingle";
import PagePreloader from "../components/globalSections/pagePreloader"
import Seo from "../components/globalComponents/seo";
import { useEffect } from 'react';
import AnimatedBtn from "../components/globalComponents/animatedBtn";





export const query = graphql`
  query Services{
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
    servicePage:allSanityPage(filter: {name: {eq: "services"}}) {
      edges {
        node {
          id
          image {
            alt
            asset {
              gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }
          name
          overview
          slug {
            current
          }
          title
          _rawDescription
        }
      }
    }
  }
`


// markup
const Services = props => {
  const { data, errors } = props;

  const services = (data || {}).services.edges;
  const servicePage = (data || {}).servicePage.edges[0];


  const keywords = services.map((service, index) => {
    return service.node.title;
  });

  useEffect(() => window.scrollTo(0, 0), []) 


  if (errors) {
    return (
      <h1>Something went wrong</h1>
    );
  }

  return (
    <main>
      <Seo title={servicePage.node.title} description={servicePage.node.description} keywords={keywords}  />
      <AnimatedBtn/>
      <PagePreloader/>
      <PageSingle pageName={servicePage.node.name} pageTitle={servicePage.node.title} itemList={services} pageImage={servicePage.node.image} pageDescription={servicePage.node._rawDescription}/>
    </main>
  )
}

export default Services
