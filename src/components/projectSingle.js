import * as React from "react"
import ProjectBanner from "../components/projectBanner";
import ProjectDetails from "../components/projectDetails";
import Gallery from "../components/gallery";
import ProjectPrototype from "../components/projectPrototype";
import SectionTestimonial from "../components/sectionTestimonial";
import ProjectNext from "../components/projectNext";




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
