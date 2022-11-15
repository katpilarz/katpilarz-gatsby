import * as React from "react"
import { graphql } from "gatsby";
import PageSingle from "../components/page/pageSingle";
import PagePreloader from "../components/globalSections/pagePreloader"
import Seo from "../components/globalComponents/seo";
import AnimatedBtn from "../components/globalComponents/animatedBtn";
import Header from "../components/globalSections/header";
import Media from 'react-media';
import { useEffect, useState } from 'react';
import { navigate } from 'gatsby';







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


  const keywords = projects.map((project, index) => {
    return project.node.title;
  });


  const [isHome] = useState(false)
  useEffect(() => window.scrollTo(0, 0), []) 
  

  if (errors) {
    return (
      navigate(`/404`)
    );
  }


  return (
   
    <main>
      <Seo title={projectsPage.node.title} description={projectsPage.node.overview} keywords={keywords}  />
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
