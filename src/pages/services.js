import * as React from "react"
import { graphql } from "gatsby";


export const query = graphql`
  query Services{
    services: allSanityService {
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
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
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

  console.log({ services })


  if (errors) {
    return (
      <h1>Something went wrong</h1>
    );
  }

  return (
    <>
    <main>
    {services.map((service, index) => {
            return (
            <article key={index}>
                <h2> {service.node.title}</h2>
            </article>
            )
          })}
    </main>
    </>
  )
}

export default Services
