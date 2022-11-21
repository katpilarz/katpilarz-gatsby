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



        const bannerAnimation = gsap.matchMedia()
        bannerAnimation.add()

        
        /************************************************************************/
        // DESKTOP ANIMATION
        /***********************************************************************/
        
        bannerAnimation.add("(min-width: 1025px)", () => {

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
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
                        scale:.47,
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

        /************************************************************************/
        // TABLET & MOBILE ANIMATION
        /***********************************************************************/
        

        bannerAnimation.add("(max-width: 1024px)", () => {

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 15%",
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
                        scale:.47,
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
            <Video videoWebm={video.webm} videoFallback={video.fallback} videoAlt={video.alt}   isDecriptionDisplayed={isDecriptionDisplayed}/> 
        </div>
    </section>

  )
}

export default SectionFeaturedVideo;