import * as React from "react"
import { graphql } from "gatsby";
import { Link } from "gatsby"




export const query = graphql`
query Projects{
    projects: allSanityProject(
      sort: {order: DESC, fields: publishedAt}
    ) {
      edges {
        node {
          id
          bannerImage {
            asset {
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH,formats: WEBP)
              url
            }
          }
          header
          isDevelopment
          isFeatured
          isInteractive
          overview
          publishedAt(formatString: "YYYY/MM")
          mockups {
            asset {
              url
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH, formats: WEBP)
            }
            alt
          }
          title
          slug {
            current
          }
          services {
            title
            slug {
              current
            }
          }
          scope
          socialMediaImage {
            asset {
              url
            }
            alt
          }
          details {
            children {
              text
            }
          }
        }
      }
    }
  }
`



// markup
const Projects = props => {
  const { data, errors } = props;

  const projects = (data || {}).projects.edges;

  console.log({ projects })



  if (errors) {
    return (
      <h1>Something went wrong</h1>
    );
  }


  return (
    <>
    <main>
      
      {projects.map((project, index) => {
        return (
          <article key={index}>
            <Link to={`/projects/${project.node.slug.current}`}>
                <h2>{project.node.title}</h2>
                {project.node.overview}
                  {project.node.publishedAt}
            </Link>
          </article>
        )
      })}
    </main>
    </>
  )
}

export default Projects
