import * as React from "react"
import { graphql } from "gatsby";
import Seo from "../components/seo";
import ProjectBanner from "../components/projectBanner";
import ProjectDetails from "../components/projectDetails";
import Gallery from "../components/gallery";
import ProjectPrototype from "../components/projectPrototype";
import ProjectTestimonial from "../components/projectTestimonial";
import ProjectNext from "../components/projectNext";
import PagePreloader from "../components/pagePreloader"



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





  if (errors) {
    return (
      <h2>Something went wrong</h2>
    );
  }

  return (

      <main className="container">
      <PagePreloader/>
      <Seo title={project.title} description={project.overview}  />
      <ProjectBanner project={project}/>
      <ProjectDetails project={project}/>
      {project.isInteractive &&
        <ProjectPrototype prototypes={project.projectPrototypes}/>
      }
      <Gallery images={project.mockups} galleryClassName='projectGallery'/>
      {project.isTestimonial &&
        <ProjectTestimonial testimonial={project._rawTestimonial} name={project.title}/>
      }
      {project.nextProject.map((nextProject, index) => {
          return(
            <ProjectNext nextProject={nextProject} key={index}/>
          )
      })}
      </main>
      
  );
};

export default ProjectTemplate;
