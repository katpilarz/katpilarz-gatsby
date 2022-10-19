import React from "react";
import * as styles from "./projectSingleNext.module.scss";
import AnimatedImage from "../globalComponents/animatedImage";
import { navigate } from 'gatsby';
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);






const ProjectSingleNext = ({ nextProject }) => {

  const nextProjectHeaderRef = useRef(null);
  const headerRef = useRef(null);
  const subheaderRef = useRef(null);


  useEffect(() => {
   
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: nextProjectHeaderRef.current,
          start: "top 57%",
          end: "top 27%",
          scrub:1, 
          repeatRefresh: true,
          toggleActions: "restart pause resume none",
        }
      });
        tl.from(headerRef.current, {
            duration: 1,
            ease: "power4.out",
            css: {
              autoAlpha: 0,
              opacity:0,
              yPercent:'30',
        }})
        tl.from(subheaderRef.current, {
          duration: 1,
          ease: "power4.out",
          css: {
            autoAlpha: 0,
            opacity:0,
            yPercent:'-30',
      }},'-=1')
  
    }, nextProjectHeaderRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);



  return (
    <button className={`${styles.nextProjectSection} container`} onClick={(e) => {
        e.preventDefault();
        navigate(`/projects/${nextProject.slug.current}`);
      }}>
        <div ref={nextProjectHeaderRef} className={styles.nextProjectHeader}>
                <p ref={subheaderRef} className="text-uppercase">Continue to Next Project</p>
                <h2 ref={headerRef} className="project-header">{nextProject.title}</h2>
        </div>
        <div className={styles.nextProjectImage}>
              <AnimatedImage imagePath={nextProject.bannerImage.asset.gatsbyImageData} imageAlt={nextProject.bannerImage.alt}/>   
        </div>
    </button>

  )
}

export default ProjectSingleNext