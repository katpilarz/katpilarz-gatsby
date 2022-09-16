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
          socialMediaImage {
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
    projectsPage:allSanityPage(filter: {name: {eq: "projects"}}) {
      edges {
        node {
          id
          image {
            alt
            asset {
              gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }
          name
          overview
          slug {
            current
          }
          title
        }
      }
    }
  }
`



// markup
const Projects = props => {
  const { data, errors } = props;

  const projects = (data || {}).projects.edges;

  const projectsPage = (data || {}).projectsPage.edges[0];



  if (errors) {
    return (
      <h1>Something went wrong</h1>
    );
  }


  return (
    <>
      <PageShared pageName={projectsPage.node.name} pageTitle={projectsPage.node.title} itemList={projects} pageImage={projectsPage.node.image}/>
    </>
  )
}

export default Projects
