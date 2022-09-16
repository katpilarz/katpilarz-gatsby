import * as React from "react"
import { graphql } from "gatsby";
import PageShared from "../components/pageShared";



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

 

  if (errors) {
    return (
      <h1>Something went wrong</h1>
    );
  }

  return (
    <>
      <PageShared pageName={servicePage.node.name} pageTitle={servicePage.node.title} itemList={services} pageImage={servicePage.node.image}/>
    </>
  )
}

export default Services
