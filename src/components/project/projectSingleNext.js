import React from "react";
import * as styles from "./projectSingleNext.module.scss";
import AnimatedImage from "../globalComponents/animatedImage";
import { navigate } from 'gatsby';
import { useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ArrowIcon from "../globalComponents/arrow";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect"
gsap.registerPlugin(ScrollTrigger);



const ProjectSingleNext = ({ nextProject }) => {

  const nextProjectHeaderRef = useRef(null);
  const headerRef = useRef(null);
  const subheaderRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
   
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...

      const animation = gsap.matchMedia()
      animation.add()

      
      animation.add("(min-width:  1025px)", () => {

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: nextProjectHeaderRef.current,
            start: "top 57%",
            end: "top 20%",
            scrub:2, 
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

      })

      animation.add("(max-width: 1024px)", () => {

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: nextProjectHeaderRef.current,
            start: "top 80%",
            end: "top 60%",
            scrub:2, 
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

      })
      
  
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
                <div ref={headerRef}  className={styles.nextProjectHeaderWrapper}>
                  <h3 className="text-color">{nextProject.title}</h3>
                  <ArrowIcon arrowIconClass="projectNextIcon"/>
                </div>
                
        </div>
        <div className={styles.nextProjectImage}>
              <AnimatedImage imagePath={nextProject.bannerImage.asset.gatsbyImageData} imageAlt={nextProject.bannerImage.alt}/>   
        </div>
    </button>

  )
}

export default ProjectSingleNext