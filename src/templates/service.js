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
      _rawDetails
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
      <Seo title={service.title} description={service.title}  />
      <h2>{service.title} </h2>
      </>
      
  );
};

export default ServiceTemplate;