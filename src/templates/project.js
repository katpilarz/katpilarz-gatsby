import React from "react";
import { graphql } from "gatsby";
import Seo from "../components/seo";
import ProjectBanner from "../components/projectBanner";
import ProjectDetails from "../components/projectDetails";
import ProjectGallery from "../components/projectGallery";



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
    }
  }
`


const ProjectTemplate = props => {
  const { data, errors } = props;
  const project = data && data.singleProject;



  if (errors) {
    return (
      <h2>Something went wrong</h2>
    );
  }

  return (

      <>
      <Seo title={project.title} description={project.overview}  />
      <ProjectBanner project={project}/>
      <ProjectDetails project={project}/>
      <ProjectGallery mockups={project.mockups}/>
      
      </>
      
  );
};

export default ProjectTemplate;
