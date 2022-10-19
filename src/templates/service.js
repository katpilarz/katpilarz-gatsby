import React from "react";
import { graphql } from "gatsby";
import Seo from "../components/globalComponents/seo";
import PagePreloader from "../components/globalSections/pagePreloader"
import ServiceSingle from "../components/service/serviceSingle";
import { useEffect } from 'react';
import { navigate } from 'gatsby';





export const query = graphql`
query ServiceTemplateQuery($id: String!){
  faqs: allSanityFaq(
    filter: {isFeaturedInService: {eq: true}}
    sort: {fields: importance, order: ASC}
  ) {
    edges {
      node {
        isFeaturedInService
        question
        _rawAnswer
        importance
      }
    }
  }
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
      sectionDetails {
        _rawDescription
        imageOne {
          alt
          asset {
            gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
        imageTwo {
          alt
          asset {
            gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH, formats: WEBP)
          }
        }
        video {
          fallback {
            asset {
              url
              altText
              extension
            }
          }
          alt
          webm {
            asset {
              altText
              extension
              url
            }
          }
        }
        header
        subheader
      }
      relatedProjects {
        bannerImage {
          alt
          asset {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, formats: WEBP)
          }
        },
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
      technologies {
        text
      }
    }
    contact:sanityHome {
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
  }
`



const ServiceTemplate = props => {
  const { data, errors } = props;
  const service = data && data.singleService;
  const contact = data && data.contact.sectionContact;
  const faqs  = data && data.faqs.edges


  useEffect(() => window.scrollTo(0, 0), []) 

  if (errors) {
    return (
      navigate(`/404`)
    );
  }

  return (
      <main>
        <Seo title={service.title} description={service.title}  />
        <PagePreloader/>
        <ServiceSingle service={service} contact={contact} faqs={faqs}/>
      </main>
      
  );
};

export default ServiceTemplate;