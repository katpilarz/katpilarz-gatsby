import * as React from "react"
import ProjectBanner from "./projectBanner";
import ProjectDetails from "./projectDetails";
import Gallery from "./gallery";
import ProjectPrototype from "./projectPrototype";
import SectionTestimonial from "../../components/global/sectionTestimonial";
import ProjectNext from "./projectNext";




const ProjectSingle = ({ project }) => {


  return (

      <div className="container">
        <ProjectBanner project={project} isSwiper='false'/>
        {project.isTestimonial &&
          <SectionTestimonial testimonial={project._rawTestimonial} pageName='project' name={project.title}/>
        }

        <ProjectDetails project={project}/>

        {project.isInteractive &&
          <ProjectPrototype prototypes={project.projectPrototypes}/>
        }
        <Gallery images={project.mockups} galleryClassName='projectGallery'/>

        {project.nextProject.map((nextProject, index) => {
            return(
              <ProjectNext nextProject={nextProject} key={index}/>
            )
        })}
      </div>
      
  );
};

export default ProjectSingle;
