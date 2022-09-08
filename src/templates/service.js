import React from "react";
import { graphql } from "gatsby";
import SEO from "../components/seo";



export const query = graphql`
query ServiceTemplateQuery($id: String!){
    singleService: sanityService (id: { eq: $id }) {
      id
      title
      slug {
        current
      }
      image {
        alt
        asset {
          url
          gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: BLURRED)
        }
      }
      description
      details {
        children {
          _key
          _type
          marks
          text
        }
        list
        style
        _type
        _rawChildren
        _key
      }
    }
  }
`



const ServiceTemplate = props => {
  const { data, errors } = props;
  const service = data && data.singleService;

  console.log({ service })

  if (errors) {
    return (
      <h1>Something went wrong</h1>
    );
  }
  return (
      <>
      <SEO title={service.title} description={service.description}  />
      <h1>Hello from Service Page <br></br> {service.title} </h1>
      <p>{service.description}</p>
      </>
      
  );
};

export default ServiceTemplate;