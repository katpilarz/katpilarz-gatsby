import * as React from "react"
import { graphql } from "gatsby";
import Seo from "../components/globalComponents/seo";
import ProjectSingle from "../components/project/projectSingle";
import PagePreloader from "../components/globalSections/pagePreloader"
import { useEffect} from 'react';
import { navigate } from 'gatsby';







export const query = graphql`
query ProjectTemplateQuery($id: String!){
  singleProject: sanityProject(id: { eq: $id }) {
      id
      header
      isDevelopment
      isInteractive
      overview
      publishedAt(formatString: "YYYY")
      scope
      slug {
        current
      }
      title
      url
      projectPrototypes {
        fallback {
          asset {
            url
            extension
          }
        }
        alt
        webm {
          asset {
            url
            extension
          }
        }
      }
      mockups {
        alt
        asset {
          url
          gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: BLURRED)
        }
      }
      bannerImage {
        asset {
          url
          gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: BLURRED)
        }
        alt
      }
      socialMediaImage {
        alt
        asset {
          url
        }
      }
      services {
        slug {
          current
        }
        title
      }
      _rawDetails
      tools
      isTestimonial
      _rawTestimonial
      nextProject {
        bannerImage {
          asset {
            gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH, formats: WEBP)
          }
          alt
        }
        title
        slug {
          current
        }
      }
    }
  }
`


const ProjectTemplate = props => {
  const { data, errors } = props;
  const project = data && data.singleProject;

  useEffect(() => window.scrollTo(0, 0), []) 


  if (errors) {
    return (
      navigate(`/404`)
    );
  }


  return (

      <main>
        <PagePreloader/>
        <Seo title={project.title} description={project.overview}  />
        <ProjectSingle project={project}/>
      </main>
      
  );
};

export default ProjectTemplate;
