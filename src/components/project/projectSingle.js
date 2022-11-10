import * as React from "react"
import {useState} from "react"
import Banner from "../globalSections/banner";
import ProjectSingleDetails from "./projectSingleDetails";
import ProjectSingleGallery from "./projectSingleGallery";
//import ProjectSinglePrototype from "./projectSinglePrototype";
import SectionTestimonial from "../globalSections/sectionTestimonial";
import SectionFeaturedVideo from "../globalSections/sectionFeaturedVideo";
import ProjectSingleNext from "./projectSingleNext";
import AnimatedBtn from "../globalComponents/animatedBtn";
import Media from 'react-media';



const ProjectSingle = ({ project, video }) => {

  const [isHome] = useState(false)
 


  return (

      <>
        <Banner title={project.title} image={project.bannerImage} services={project.services} overview={project.overview} publishedAt={project.publishedAt}/>
        <Media query="(min-width: 569px)" render={() =>
          (
            <AnimatedBtn isHome={isHome}/>
          )}
        />
        {project.isTestimonial &&
          <SectionTestimonial testimonial={project._rawTestimonial} pageName='project' name={project.title}/>
        }
        {project.isInteractive &&
          <SectionFeaturedVideo video={video}/>
        }

        <ProjectSingleDetails project={project}/>

        
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
