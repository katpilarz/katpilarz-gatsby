import React from "react";
import { graphql } from "gatsby";
import Seo from "../components/seo";
import ProjectBanner from "../components/projectBanner";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

/*import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Project from "../components/project";*/


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
      description
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
      details {
        children {
          text
          marks
        }
        style
      }
    }
  }
`


const ProjectTemplate = props => {
  const { data, errors } = props;
  const project = data && data.singleProject;

  console.log({ project })


  if (errors) {
    return (
      <h2>Something went wrong</h2>
    );
  }

  return (

      <>
      <Seo title={project.title} description={project.overview}  />
      <ProjectBanner project={project}/>
      <div className='project-gallery'>
        {project.mockups.map((image, index) => {
            return (
              <GatsbyImage key={image.index}
                image={getImage(image.asset.gatsbyImageData)}
                className="project-img"
                alt={image.asset.alt}
            />
            )
        })}
      </div>
      </>
      
  );
};

export default ProjectTemplate;
