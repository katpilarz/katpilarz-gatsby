import React from "react";
import { graphql } from "gatsby";
import Seo from "../components/seo";
import ProjectBanner from "../components/projectBanner";
import ProjectDetails from "../components/projectDetails";
import Gallery from "../components/gallery";



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
      isTestimonial
      testimonial {
        _rawChildren
      }
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
      <Gallery images={project.mockups} galleryClassName='projectGallery'/>
      
      </>
      
  );
};

export default ProjectTemplate;
