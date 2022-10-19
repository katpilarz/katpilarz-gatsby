import React from "react"
import * as styles from "./sectionAboutDetails.module.scss";
import AnimatedImage from "../globalComponents/animatedImage";
import PortableText from "react-portable-text"
import Video from "../globalComponents/video";
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);





const SectionAboutDetails = ({ text, imageOne, imageTwo, video }) => {


    const sectionRef = useRef(null);
    const paragraphRef = useRef(null);


    useEffect(() => {
   
        // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
        // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
        let ctx = gsap.context(() => {


                const tl = gsap.timeline({
                    scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 67%",
                    end: "top 30%",
                    scrub:2, 
                    repeatRefresh: true,
                    toggleActions: "restart pause resume none",
                    }
                });
                tl.from(paragraphRef.current, {
                    duration: 4,
                    ease: "power2.out",
                    css: {
                    autoAlpha: 0,
                    yPercent:'30',
                }})

      
        }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
        
        return () => ctx.revert(); // cleanup! 
      }, []);

  
  return (
            
    <div ref={sectionRef} className={`${styles.sectionContentWrapper} container`}>   
        <div className={styles.sectionContentLeft}> 
            <div className={styles.aboutImageOne}>
                <AnimatedImage imagePath={imageOne.asset.gatsbyImageData} imageAlt={imageOne.alt}/>   
            </div>
        </div> 
        <div className={styles.sectionContentRight}>
            {imageTwo &&
                <div className={styles.aboutMedia}>
                    <AnimatedImage imagePath={imageTwo.asset.gatsbyImageData} imageAlt={imageTwo.alt}/>   
                </div>
            }
            {video &&
                <div className={styles.aboutMedia}>
                    <Video videoWebm={video.webm} videoFallback={video.fallback} videoAlt={video.alt} videoCustomClass='projectPrototype' isDecriptionDisplayed='false'/>  
                </div>
            }

            <div  className={styles.aboutDescription} ref={paragraphRef}>    
                <PortableText
                    content={text}
                    projectId={process.env.GATSBY_SANITY_PROJECT_ID}
                    dataset={process.env.GATSBY_SANITY_DATASET}
                />
            </div>
        </div>
        
    </div>
            
  )
}

export default SectionAboutDetails;