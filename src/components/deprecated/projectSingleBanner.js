import React from "react";
import * as styles from "./projectSingleBanner.module.scss";
//import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import AnimatedImage from "../global/animatedImage";




const ProjectSingleBanner = ({ project }) => {


    const pageSingleRef = useRef(null);



    useEffect(() => {
   
        // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
        // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
        


            let ctx = gsap.context(() => {
                // create as many GSAP animations and/or ScrollTriggers here as you want...
                const tl = gsap.timeline();
          
                  tl.from(pageSingleRef.current, {
                      duration: 2, 
                      ease:'power2.out',
                      css: {
                          yPercent:'50',
                      }}
                  )
            
              }, pageSingleRef); // <- scopes all selector text inside the context to this component (optional, default is document)
              
              return () => ctx.revert(); // cleanup! 
        
        
      }, []);
    

  return (
    <section ref={pageSingleRef} className={styles.projectBanner}>
        <div className={styles.projectBannerHeader}>
        <h2 className={styles.header}>{project.title}</h2>
            
            <div className={styles.projectBannerDetails}>
                <p>{project.publishedAt}</p>
                <div className={styles.servicesList}>
                     {project.services.map((service, index) => {
                         return(
                         <div className={styles.serviceSingle} key={index}>
                             <p>{service.title}</p> 
                         </div> 
                         )
                     })}
                 </div> 
                <p>{project.overview}</p> 
            </div>
        </div>
        <div className={styles.projectImageContainer}>
              <AnimatedImage imagePath={project.bannerImage.asset.gatsbyImageData} imageAlt={project.bannerImage.alt}/>   
        </div>

    </section>
  )
}

export default ProjectSingleBanner