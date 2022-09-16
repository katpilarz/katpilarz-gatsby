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
  }
`


// markup
const Services = props => {
  const { data, errors } = props;

  const services = (data || {}).services.edges;


  if (errors) {
    return (
      <h1>Something went wrong</h1>
    );
  }

  return (
    <>
      <PageShared pageName='services' pageTitle='Impactful Solutions' itemList={services} pageImage='https://images.pexels.com/photos/8473776/pexels-photo-8473776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'/>
    </>
  )
}

export default Services
