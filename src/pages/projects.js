import * as React from "react"
import { graphql } from "gatsby";
import PageShared from "../components/pageShared";




export const query = graphql`
query Projects{
    projects: allSanityProject(
      sort: {order: DESC, fields: publishedAt}
    ) {
      edges {
        node {
          bannerImage {
            asset {
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH,formats: WEBP)
              url
            }
          }
          publishedAt(formatString: "YYYY/MM")
          title
          slug {
            current
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
    <PageShared pageName="projects" pageTitle='Selected Projects' itemList={projects} pageImage='https://images.pexels.com/photos/8473776/pexels-photo-8473776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'/>
  </>
      
  )
}

export default Projects
