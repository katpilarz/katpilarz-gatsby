import React from "react";
import { graphql } from "gatsby";
import Seo from "../components/global/seo";
import PagePreloader from "../components/global/pagePreloader"
import ServiceSingle from "../components/service/serviceSingle";
import { useEffect } from 'react';




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
    contact:sanityHome {
      sectionContact {
        projectFeatures
        subheader
        headerOne
        headerTwo
        contactLinks {
          text
          url
        }
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
  }
`



const ServiceTemplate = props => {
  const { data, errors } = props;
  const service = data && data.singleService;
  const contact = data && data.contact.sectionContact;


  useEffect(() => window.scrollTo(0, 0), []) 

  if (errors) {
    return (
      <h2>Something went wrong</h2>
    );
  }
  return (
      <main>
        <Seo title={service.title} description={service.title}  />
        <PagePreloader/>
        <ServiceSingle service={service} contact={contact}/>
      </main>
      
  );
};

export default ServiceTemplate;