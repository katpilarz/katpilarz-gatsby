import * as React from "react"
import { graphql } from "gatsby";
import PageSingle from "../components/page/pageSingle";
import PagePreloader from "../components/globalSections/pagePreloader"
import Seo from "../components/globalComponents/seo";
import AnimatedBtn from "../components/globalComponents/animatedBtn";
import Header from "../components/globalSections/header";
import Media from 'react-media';
import { useEffect, useState } from 'react';
import { navigate } from 'gatsby';






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

  const [isHome] = useState(false)

  useEffect(() => window.scrollTo(0, 0), []) 


  if (errors) {
    return (
      navigate(`/404`)
    );
  }


  return (
    <main>
      <Seo title={servicePage.node.title} description={servicePage.node.overview} keywords={keywords} overview='Helping Brands to create outstanding Experience' />
      <Media query="(min-width: 569px)" render={() =>
          (
            <AnimatedBtn isHome={isHome}/>
          )}
        />
      <PagePreloader/>
      <Header isHome={isHome}/>
      <PageSingle pageName={servicePage.node.name} pageTitle={servicePage.node.title} itemList={services} pageImage={servicePage.node.image} pageDescription={servicePage.node.overview}/>
    </main>
  )
}

export default Services
