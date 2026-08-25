import * as React from "react"
import { graphql } from "gatsby";
import PageSingle from "../components/page/pageSingle";
import PagePreloader from "../components/globalSections/pagePreloader"
import Seo from "../components/globalComponents/seo";
import AnimatedBtn from "../components/globalComponents/animatedBtn";
import Header from "../components/globalSections/header";
import Media from "../components/globalComponents/media";
import { useEffect, useState } from 'react';
import { navigate } from 'gatsby';







export const query = graphql`
query Projects{
    projects: allSanityProject(
      sort: {publishedAt: DESC}
    ) {
      edges {
        node {
          thumbnailSocialMedia {
            alt
            asset {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, formats: WEBP)
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
      <Media query="(min-width: 569px)" render={() =>
          (
            <AnimatedBtn isHome={isHome}/>
          )}
        />
      <PagePreloader/>
      <Header isHome={isHome}/>
       <PageSingle pageName={projectsPage.node.name} pageTitle={projectsPage.node.title} itemList={projects} pageImage={projectsPage.node.image} pageDescription={projectsPage.node.overview}/>
    </main>
  )
}

export default Projects

export const Head = ({data, location}) => {
  const page = data.projectsPage.edges[0].node
  const keywords = data.projects.edges.map(({node}) => node.title)
  return (
    <Seo
      title={page.title}
      description={page.overview}
      keywords={keywords}
      overview={page.overview}
      pathname={location.pathname}
    />
  )
}
