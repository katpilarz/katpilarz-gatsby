import * as React from "react"
import Banner from "../globalSections/banner";
import ProjectSingleDetails from "./projectSingleDetails";
import ProjectSingleGallery from "./projectSingleGallery";
import SectionTestimonial from "../globalSections/sectionTestimonial";
import SectionFeaturedVideo from "../globalSections/sectionFeaturedVideo";
import ProjectSingleNext from "./projectSingleNext";
import Media from "../globalComponents/media";



const ProjectSingle = ({ project, isHome }) => {


  return (

      <>
        <Banner title={project.title} image={project.bannerImage} services={project.services} overview={project.overview} publishedAt={project.publishedAt}/>
        {project.isTestimonial &&
          <SectionTestimonial testimonial={project._rawTestimonial} pageName='project' name={project.title} isHome={isHome}/>
        }
        {project.isInteractive && project.prototype &&
         
          <Media query="(min-width: 569px)" render={() =>
            (
              <SectionFeaturedVideo video={project.prototype} isDecriptionDisplayed="false"/>
              
            )}
          />
        }
        {project.isInteractive && project.prototypeMobile &&
        
          
            <Media query="(max-width: 568px)" render={() =>
              
              (
                <SectionFeaturedVideo video={project.prototypeMobile} isDecriptionDisplayed="false"/>
                
              )}
            />
        }

        <ProjectSingleDetails project={project}/>

        {/* NDA work carries no galleries. The details section above already
            renders the prose, role, impact and stack, which is the whole story
            for a project that cannot be shown. */}
        {!project.isConfidential &&
          <>
            <ProjectSingleGallery images={project.mockups} galleryClassName='projectGallery'/>

            <Media query="(max-width: 768px)" render={() =>
              { project.mobileMockups &&
                (

                  <div className="device-mockups-wrapper">
                    <ProjectSingleGallery images={project.mobileMockups} galleryClassName='projectGallery'/>
                    </div>


                )}
              }
            />

            <Media query="(min-width: 768px)" render={() =>
              { project.desktopMockups &&
                (
                  <div className="device-mockups-wrapper">
                    <ProjectSingleGallery images={project.desktopMockups} galleryClassName='projectGallery'/>
                  </div>

                )}
              }
            />
          </>
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
