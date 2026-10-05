import * as React from "react"
import Banner from "../globalSections/banner";
import ProjectSingleDetails from "./projectSingleDetails";
import ProjectSingleGallery from "./projectSingleGallery";
import SectionTestimonial from "../globalSections/sectionTestimonial";
import SectionFeaturedVideo from "../globalSections/sectionFeaturedVideo";
import ProjectSingleNext from "./projectSingleNext";
import ProjectSingleCaseStudy from "./projectSingleCaseStudy";
import Media from "../globalComponents/media";



const ProjectSingle = ({ project, isHome }) => {

  // A project with case study sections carries its images in them; the
  // galleries below are for projects that have none yet.
  const hasCaseStudy = project.caseStudy?.length > 0

  // The client's word, early: straight after the case study's Context, or
  // after the facts for a project that has no case study.
  const testimonial = project.isTestimonial &&
    <SectionTestimonial testimonial={project._rawTestimonial} pageName='project' name={project.title} isHome={isHome}/>


  return (

      <>
        {/* `year` is the field meant to be read — the schema calls it the
            display year, and lets it be a range like "2024—2026". publishedAt
            is the sort key, so a project can be reordered on the work page
            without its banner suddenly claiming the wrong year. Falls back to
            publishedAt for anything that has no year set. */}
        <Banner title={project.title} image={project.bannerImage} services={project.services} overview={project.overview} publishedAt={project.year || project.publishedAt}/>
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

        {!hasCaseStudy && testimonial}

        {hasCaseStudy &&
          <ProjectSingleCaseStudy sections={project.caseStudy} showImages={!project.isConfidential} afterContext={testimonial}/>
        }

        {/* NDA work carries no galleries. The intro above already renders the
            prose, role, impact and stack, which is the whole story for a
            project that cannot be shown. */}
        {!hasCaseStudy && !project.isConfidential &&
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

        {/* A reference to a project that is not published yet resolves to
            null, and one of those should not take the whole page down. */}
        {(project.nextProject || []).filter(Boolean).map((nextProject, index) => {
            return(
              <ProjectSingleNext nextProject={nextProject} key={index}/>
            )
        })}
      </>
      
  );
};

export default ProjectSingle;
