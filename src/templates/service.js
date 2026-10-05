import React from "react";
import { graphql } from "gatsby";
import Seo from "../components/globalComponents/seo";
import PagePreloader from "../components/globalSections/pagePreloader"
import Header from "../components/globalSections/header";
import ServiceSingle from "../components/service/serviceSingle";
import { useEffect, useState } from 'react';
import { navigate } from 'gatsby';





export const query = graphql`
query ServiceTemplateQuery($id: String!){
  faqs: allSanityFaq(
    filter: {isFeaturedInService: {eq: true}}
    sort: {publishedAt: DESC})  {
    edges {
      node {
        isFeaturedInService
        question
        _rawAnswer
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
      featuredVideo {
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
        cloudinaryVideo {
          url
          secure_url
          format
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
          cloudinaryVideo {
            url
            secure_url
            format
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

  const [isHome] = useState(false)
  useEffect(() => {
    // Braces matter: an arrow without them implicitly returns whatever
    // scrollTo gives back, and React treats an effect's return value as the
    // cleanup. It only checks `!== undefined`, so any non-function value is
    // called on unmount and throws "destroy is not a function".
    window.scrollTo(0, 0)
  }, []) 

  if (errors) {
    return (
      navigate(`/404`)
    );
  }

  return (
      <main>
        <PagePreloader/>
        <Header isHome={isHome}/>
        <ServiceSingle isHome={isHome} service={service} contact={contact} faqs={faqs}/>
      </main>
      
  );
};

export default ServiceTemplate;

export const Head = ({data, location}) => {
  const service = data.singleService
  return (
    <Seo
      title={service.title}
      description={service.sectionDetails.header}
      overview={service.sectionDetails.header}
      pathname={location.pathname}
    />
  )
}
