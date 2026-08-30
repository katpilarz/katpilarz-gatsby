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
  // One ref for the card column rather than one per card: the set is now
  // variable — role, year and produced-by only appear when they are filled in.
  const overviewRef = useRef(null);
  const subheaderRef = useRef(null);
  const headerRef = useRef(null);


  useIsomorphicLayoutEffect(() => {
   
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...
      
      // FIRST TIMELINE
      // Each card slides in behind the one before it. Reading the cards off the
      // container keeps the stagger identical however many are rendered.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: overviewRef.current,
          start: "top 67%",
          end: "top 27%",
          scrub:2, 
          repeatRefresh: true,
          toggleActions: "restart pause resume none",
        }
      });

        gsap.utils.toArray(overviewRef.current.children).forEach((card) => {
            tl.from(card, {
                duration: 1,
                ease: "power2.out",
                css: {
                autoAlpha: 0,
                opacity:0,
                xPercent:'30',
            }})
        })

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
  }, []);


  // A link into paisak4u's /work/ is the full case study for this project;
  // anything else is the product or site itself.
  const isCaseStudy = /paisak4u\.com\/work\//.test(project.url || '')

  return (
    <section ref={projectDetailsRef} className={`${styles.projectDetails} container`}>
        <div className={styles.projectDetailsLeft}>
            <div className={styles.projectDetailsHeader}>
                <p className="text-uppercase" ref={subheaderRef}>Project Details</p>
                <h3 ref={headerRef}>{project.header}</h3>
           </div>

           {/* The outcomes sit directly under the headline rather than after
               the prose: they are the summary, and on a long case study the
               foot of the article is not where a summary belongs. */}
           {project.impact?.length > 0 &&
                <div className={styles.impactList}>
                    {project.impact.map((item, index) => {
                        return(
                        <div className={styles.impactSingle} key={index}>
                            <p className={`${styles.impactValue} text-color`}>{item.value}</p>
                            <span>{item.label}</span>
                        </div>
                        )
                    })}
                </div>
           }
           <Description description={project._rawDetails} descriptionCustomClass="projectDescription"/>


        </div>
        <div className={styles.projectDetailsRight}>
           
           <div ref={overviewRef} className={styles.projectDetailsOverview}>
                <div className={styles.projectOverviewCard}>
                    <p className={`${styles.overviewName} text-uppercase`}>
                        {project.producedBy ? 'Produced by' : 'Client'}
                    </p>
                    <span>{project.producedBy || project.title}</span>
                </div>
                {project.role &&
                    <div className={styles.projectOverviewCard}>
                        <p className={`${styles.overviewName} text-uppercase`}>Role</p>
                        <span>{project.role}</span>
                    </div>
                }
                <div className={styles.projectOverviewCard}>
                    <p className={`${styles.overviewName} text-uppercase`}>Scope</p>
                    <span>{project.scope}</span>
                </div>
                {project.year &&
                    <div className={styles.projectOverviewCard}>
                        <p className={`${styles.overviewName} text-uppercase`}>Year</p>
                        <span>{project.year}</span>
                    </div>
                }
                <div className={styles.projectOverviewCard}>
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
                {project.isDevelopment && project.url &&
                    <div className={styles.projectOverviewCard}>
                        {/* Where the link goes decides what it is called. A
                            project whose link points at a paisak4u case study
                            is not a "live page" to go and use — it is the long
                            version of this write-up, hosted where it was
                            written. Anything else is the site itself. */}
                        <p className={`${styles.overviewName} text-uppercase`}>
                            {isCaseStudy ? 'Case study' : 'Website'}
                        </p>
                        <a
                            href={project.url}
                            aria-label={isCaseStudy
                                ? `Read the full ${project.title} case study`
                                : `${project.title} development link view`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {isCaseStudy ? 'View case study in detail' : 'View Live Page'}
                        </a>
                    </div>
                }
            </div>
            
        </div>

    </section>
  )
}

export default ProjectSingleDetails