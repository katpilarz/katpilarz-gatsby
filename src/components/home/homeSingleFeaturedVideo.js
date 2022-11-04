import React from "react"
import * as styles from "./homeSingleFeaturedVideo.module.scss";
import Video from "../globalComponents/video";
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);




const HomeSingleFeaturedVideo = ({ video }) => {


 const sectionRef = useRef(null)
 const videoRef = useRef(null)


  useEffect(() => {
   
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {


      const animation = gsap.matchMedia()
          animation.add()


          
          animation.add("(min-width: 1280px)", () => {

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "center center",
                scrub: true, 
                pin: true, 
                pinSpacing: true,
                repeatRefresh: true,
                toggleActions: "restart pause none none",
              }
            });
                  tl.fromTo(videoRef.current, {
                      duration:10,
                      ease: "power4.out",
                      css: {
                          clipPath: 'circle(20.0% at 50% 50%)',
                          position: 'absolute',
                          top:'20%',
                          margin: 'auto',
                          zIndex:1,
                          width:'40vw',
                          transformOrigin:'center',
                      }
                  },{
                      duration:4,
                      ease: "power4.out",
                      css: {
                          clipPath: 'circle(100% at 50% 50%)',
                          width:'67vw',
                          position: 'absolute',
                          top:'6vw',
                          margin: 'auto',
                          zIndex:1,
                          transformOrigin:'center',
  
                      }
                  })   
  
    
          })


          animation.add("(max-width: 1279px)", () => {

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "center center",
                scrub: true, 
                pin: true, 
                pinSpacing: true,
                repeatRefresh: true,
                toggleActions: "restart pause none none",
              }
            });
                  tl.fromTo(videoRef.current, {
                      duration:10,
                      ease: "power4.out",
                      css: {
                          clipPath: 'circle(20.0% at 50% 50%)',
                          position: 'absolute',
                          top:'20%',
                          margin: 'auto',
                          zIndex:1,
                          width:'50vw',
                          transformOrigin:'center',
                      }
                  },{
                      duration:4,
                      ease: "power4.out",
                      css: {
                          clipPath: 'circle(100% at 50% 50%)',
                          width:'90vw',
                          position: 'absolute',
                          top:'3.4vw',
                          margin: 'auto',
                          zIndex:1,
                          transformOrigin:'center',
  
                      }
                  })   
  
    
          })


        
            
  
    }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);

 

   
  return (
    <section ref={sectionRef} className={styles.featuredVideoSection}>
        <div ref={videoRef} className={styles.featuredVideo}>
            <Video videoWebm={video.webm} videoFallback={video.fallback} videoAlt={video.alt}   isDecriptionDisplayed='false'/> 
        </div>
    </section>

  )
}

export default HomeSingleFeaturedVideo;