import React from "react";
import * as styles from "./projectSingleDetails.module.scss";
import { useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Description from "../globalComponents/description";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect"

gsap.registerPlugin(ScrollTrigger);


const ProjectSingleDetails = ({ project }) => {


  const projectDetailsRef = useRef(null);
  const detailOneRef = useRef(null);
  const detailTwoRef = useRef(null);
  const detailThreeRef = useRef(null);
  const detailFourRef = useRef(null);
  const subheaderRef = useRef(null);
  const headerRef = useRef(null);


  useIsomorphicLayoutEffect(() => {
   
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...
      
      // FIRST TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: detailOneRef.current,
          start: "top 67%",
          end: "top 27%",
          scrub:2, 
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
              trigger: subheaderRef.current,
              start: "top 47%",
              end: "top 17%",
              scrub:2, 
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
  
    }, projectDetailsRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, [project.isDevelopment]); // sorting out missing dependancy


  return (
    <section ref={projectDetailsRef} className={`${styles.projectDetails} container`}>
        <div className={styles.projectDetailsLeft}>
            <div className={styles.projectDetailsHeader}>
                <p className="text-uppercase" ref={subheaderRef}>Project Details</p>
                <h3 ref={headerRef}>{project.header}</h3>
           </div>
           <Description description={project._rawDetails} descriptionCustomClass="projectDescription"/>
           
        </div>
        <div className={styles.projectDetailsRight}>
           
           <div className={styles.projectDetailsOverview}>
                <div ref={detailOneRef}  className={styles.projectOverviewCard}>
                    <p className={`${styles.overviewName} text-uppercase`}>Client</p>
                    <span>{project.title}</span>
                </div>
                <div ref={detailTwoRef} className={styles.projectOverviewCard}>
                    <p className={`${styles.overviewName} text-uppercase`}>Scope</p>
                    <span>{project.scope}</span>
                </div>
                <div ref={detailThreeRef}  className={styles.projectOverviewCard}>
                    <p className={`${styles.overviewName} text-uppercase`}>Tools</p>
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
                        <p className='text-uppercase'>Website</p>
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