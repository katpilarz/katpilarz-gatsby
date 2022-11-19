import * as React from "react"
import Banner from "../globalSections/banner";
import ProjectSingleDetails from "./projectSingleDetails";
import ProjectSingleGallery from "./projectSingleGallery";
//import ProjectSinglePrototype from "./projectSinglePrototype";
import SectionTestimonial from "../globalSections/sectionTestimonial";
import SectionFeaturedVideo from "../globalSections/sectionFeaturedVideo";
import ProjectSingleNext from "./projectSingleNext";
import Media from 'react-media';



const ProjectSingle = ({ project, isHome }) => {

 
 


  return (

      <>
        <Banner title={project.title} image={project.bannerImage} services={project.services} overview={project.overview} publishedAt={project.publishedAt}/>
        {project.isTestimonial &&
          <SectionTestimonial testimonial={project._rawTestimonial} pageName='project' name={project.title} isHome={isHome}/>
        }
        {project.isInteractive &&
          <SectionFeaturedVideo video={project.prototype} isDecriptionDisplayed="false"/>
        }

        <ProjectSingleDetails project={project}/>

        
        <ProjectSingleGallery images={project.mockups} galleryClassName='projectGallery'/>
        { project.desktopMockups &&
          <Media query="(min-width: 768px)" render={() =>
            (
                <ProjectSingleGallery images={project.desktopMockups} galleryClassName='projectGallery'/>

              
            )}
          />
        }

        {project.nextProject.map((nextProject, index) => {
            return(
              <ProjectSingleNext nextProject={nextProject} key={index}/>
            )
        })}
      </>
      
  );
};

export default ProjectSingle;
