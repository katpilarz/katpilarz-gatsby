import React from "react";
import { graphql } from "gatsby";
import Seo from "../components/seo";



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
      <h2>Something went wrong</h2>
    );
  }
  return (
      <>
      <Seo title={service.title} description={service.description}  />
      <h2>{service.title} </h2>
      <p>{service.description}</p>
      </>
      
  );
};

export default ServiceTemplate;