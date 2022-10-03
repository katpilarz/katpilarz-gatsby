import React from "react";
import { graphql } from "gatsby";
import Seo from "../components/seo";
import PagePreloader from "../components/pagePreloader"



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


  if (errors) {
    return (
      <h2>Something went wrong</h2>
    );
  }
  return (
      <main className="container">

      <Seo title={service.title} description={service.title}  />
      <PagePreloader/>
      <h2>{service.title} </h2>
      </main>
      
  );
};

export default ServiceTemplate;