import * as React from "react"
import Banner from "../globalSections/banner";
import ProjectSingleDetails from "./projectSingleDetails";
import ProjectSingleGallery from "./projectSingleGallery";
import ProjectSinglePrototype from "./projectSinglePrototype";
import SectionTestimonial from "../globalSections/sectionTestimonial";
import ProjectSingleNext from "./projectSingleNext";
import AnimatedBtn from "../globalComponents/animatedBtn";



const ProjectSingle = ({ project }) => {


  return (

      <>
        <Banner title={project.title} image={project.bannerImage} services={project.services} overview={project.overview} publishedAt={project.publishedAt}/>
        <AnimatedBtn/>
        {project.isTestimonial &&
          <SectionTestimonial testimonial={project._rawTestimonial} pageName='project' name={project.title}/>
        }

        <ProjectSingleDetails project={project}/>

        {project.isInteractive &&
          <ProjectSinglePrototype prototypes={project.projectPrototypes}/>
        }
        <ProjectSingleGallery images={project.mockups} galleryClassName='projectGallery'/>

        {project.nextProject.map((nextProject, index) => {
            return(
              <ProjectSingleNext nextProject={nextProject} key={index}/>
            )
        })}
      </>
      
  );
};

export default ProjectSingle;
