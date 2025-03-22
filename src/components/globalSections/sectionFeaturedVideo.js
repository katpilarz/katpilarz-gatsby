import React from "react"
import * as styles from "./sectionFeaturedVideo.module.scss";
import Video from "../globalComponents/video";
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);




const SectionFeaturedVideo = ({ video, isDecriptionDisplayed }) => {


 const sectionRef = useRef(null)
 const videoRef = useRef(null)



useEffect(() => {

  let ctx = gsap.context(() => {
    // create as many GSAP animations and/or ScrollTriggers here as you want...




      const animation = gsap.matchMedia()
      animation.add()

      
      /************************************************************************/
      // DESKTOP & TABLET ANIMATION
      /***********************************************************************/
      
      animation.add("(min-width: 569px)", () => {

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "center center",
            scrub: true, 
            pin: true, 
            pinSpacing: false,
            repeatRefresh: true,
            toggleActions: "restart pause none none",
          }
        });
              tl.fromTo(videoRef.current, {
                  css: {
                      clipPath: 'circle(22.7% at 50% 50%)',
                      scale:.87,
                  }
              },{
                  duration:8,
                  ease: "sine.out",
                  css: {
                    clipPath: 'circle(70.7% at 50% 50%)',
                    scale:1.6,
                  }
              })   
  
  
      })

      /************************************************************************/
      // MOBILE ANIMATION
      /***********************************************************************/
      

      animation.add("(max-width: 568px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "center center",
            scrub: true, 
            pin: true, 
            pinSpacing: false,
            repeatRefresh: true,
            toggleActions: "restart pause none none",
          }
        });
              tl.fromTo(videoRef.current, {
                  css: {
                      clipPath: 'circle(27.7% at 50% 50%)',
                      scale:.87,
                  }
              },{
                  duration:8,
                  ease: "power2.out",
                  css: {
                    clipPath: 'circle(70.7% at 50% 50%)',
                    scale:1,
                  }
              })   
  
       
  
      })

 

  }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
  
  return () => ctx.revert(); // cleanup! 

// create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
// A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 

}, []);


 

   
  return (
    <section ref={sectionRef} className={`${styles.featuredVideoSection} container`}>
        <div ref={videoRef} className={styles.featuredVideo}>
            <Video videoWebm={video.webm} videoFallback={video.fallback} videoAlt={video.alt} videoCloudinary={video.cloudinaryVideo}  isDecriptionDisplayed={isDecriptionDisplayed}/> 
        </div>
    </section>

  )
}

export default SectionFeaturedVideo;
