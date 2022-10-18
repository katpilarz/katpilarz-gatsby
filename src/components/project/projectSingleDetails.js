import React from "react";
import * as styles from "./projectSingleDetails.module.scss";
import PortableText from "react-portable-text"
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);




const ProjectSingleDetails = ({ project }) => {



  const projectDetailsRef = useRef(null);
  const detailOneRef = useRef(null);
  const detailTwoRef = useRef(null);
  const detailThreeRef = useRef(null);
  const detailFourRef = useRef(null);
  const subheaderRef = useRef(null);
  const headerRef = useRef(null);
  const descriptionRef = useRef(null);



  useEffect(() => {

   
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...
      
      // FIRST TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: projectDetailsRef.current,
          start: "top 60%",
          end: "top 30%",
          scrub:1, 
          repeatRefresh: true,
          toggleActions: "restart pause resume none",
        }
      });
        tl.from(detailOneRef.current, {
            duration: 1,
            ease: "power2.out",
            css: {
            autoAlpha: 0,
            opacity:0,
            xPercent:'30',
        }})
        tl.from(detailTwoRef.current, {
            duration: 1,
            ease: "power2.out",
            css: {
              autoAlpha: 0,
              opacity:0,
              xPercent:'30',
        }})
        tl.from(detailThreeRef.current, {
            duration: 1,
            ease: "power2.out",
            css: {
              autoAlpha: 0,
              opacity:0,
              xPercent:'30',
        }})

            // eslint-disable-next-line react-hooks/exhaustive-deps
        if(project.isDevelopment){
            tl.from(detailFourRef.current, {
                duration: 1,
                ease: "power2.out",
                css: {
                  autoAlpha: 0,
                  opacity:0,
                  xPercent:'30',
            }})
        }


        // SECOND TIMELINE

        const tl2 = gsap.timeline({
            scrollTrigger: {
              trigger: projectDetailsRef.current,
              start: "top 77%",
              end: "top 35%",
              scrub:1, 
              repeatRefresh: true,
              toggleActions: "restart pause resume none",
            }
          });
            tl2.from(subheaderRef.current, {
                duration: 1,
                ease: "power2.out",
                css: {
                autoAlpha: 0,
                opacity:0,
                yPercent:'-30',
            }})

            tl2.from(headerRef.current, {
                duration: 1,
                ease: "power2.out",
                css: {
                autoAlpha: 0,
                opacity:0,
                yPercent:'30',
            }},'-=1')

            tl2.from(descriptionRef.current, {
                duration: 1,
                ease: "power2.out",
                css: {
                autoAlpha: 0,
                opacity:0,
                yPercent:'50'
            }})

  
    }, projectDetailsRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, [project.isDevelopment]); // sorting out missing dependancy



  return (
    <section ref={projectDetailsRef} className={`${styles.projectDetails} container`}>
        <div className={styles.projectDetailsRight}>
            <div className={styles.projectDetailsHeader}>
                <p ref={subheaderRef}>PROJECT DETAILS</p>
                <h4 ref={headerRef}>{project.header}</h4>
           </div>

           <div ref={descriptionRef} className={styles.projectDescription}>
                <PortableText 
                    content={project._rawDetails}
                    projectId={process.env.GATSBY_SANITY_PROJECT_ID}
                    dataset={process.env.GATSBY_SANITY_DATASET}
                />
           </div>
           



            
        </div>
        <div className={styles.projectDetailsLeft}>
           
           <div className={styles.projectDetailsOverview}>
                <div ref={detailOneRef}  className={styles.projectOverviewCard}>
                    <p className={styles.overviewName}>CLIENT</p>
                    <span>{project.title}</span>
                </div>
                <div ref={detailTwoRef} className={styles.projectOverviewCard}>
                    <p className={styles.overviewName}>SCOPE</p>
                    <span>{project.scope}</span>
                </div>
                <div ref={detailThreeRef}  className={styles.projectOverviewCard}>
                    <p className={styles.overviewName}>TOOLS</p>
                    <div className={styles.toolsList}>
                        {project.tools.map((tool, index) => {
                            return(
                            <div className={styles.toolSingle} key={index}>
                                <span>{tool}</span>
                            </div> 
                            )
                        })}
                    </div> 
                </div>
                {project.isDevelopment &&
                    <div ref={detailFourRef}  className={styles.projectOverviewCard}>
                        <p>WEBSITE</p>
                        <a href={project.url} aria-label={`${project.title} development link view`} rel="noopener noreferrer" target="_blank">
                            View Live Page
                        </a>
                    </div>
                }
            </div>
            
            
        </div>
        

    </section>
  )
}

export default ProjectSingleDetails