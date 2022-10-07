import * as React from "react"
import Banner from "../../components/global/banner";
import ProjectSingleDetails from "./projectSingleDetails";
import ProjectSingleGallery from "./projectSingleGallery";
import ProjectSinglePrototype from "./projectSinglePrototype";
import SectionTestimonial from "../../components/global/sectionTestimonial";
import ProjectSingleNext from "./projectSingleNext";

/*
const details = project.map(() => {
  return {
    publishedAt: project.publishedAt,
    services: project.services,
    overview: project.overview
  }
});*/





const ProjectSingle = ({ project }) => {


  return (

      <div className="container">
        <Banner title={project.title} image={project.bannerImage} services={project.services} overview={project.overview} publishedAt={project.publishedAt}/>
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
      </div>
      
  );
};

export default ProjectSingle;
