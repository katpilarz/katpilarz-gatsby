import * as React from "react"
import { graphql } from "gatsby";
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"



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

  console.log({ services })


  if (errors) {
    return (
      <h1>Something went wrong</h1>
    );
  }

  return (
    <>
    <main className="servicesList">
    {services.map((service, index) => {
            
            return (
              <article key={index} className='serviceCard'>
                  <div className='serviceCardImage'>
                      <GatsbyImage
                        image={getImage(service.node.image.asset.gatsbyImageData)}
                        className="project-img"
                        alt={service.node.image.alt}
                      />
                  </div>
                  <Link to={`/services/${service.node.slug.current}`}>
                    <div className='serviceCardHeader'>
                        <h2> {service.node.title}</h2>
                    </div>
                  </Link>
              </article>
              
            
        
            )
          })}
    </main>
    </>
  )
}

export default Services
