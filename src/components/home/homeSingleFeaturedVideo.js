import React from "react"
//import * as styles from "./homeSingleGallery.module.scss";
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
                    duration:8,
                    ease: "power4.out",
                    css: {
                        clipPath: 'circle(15.0% at 50% 50%)',
                        position: 'absolute',
                        top:'50%',
                        left:'50%',
                        zIndex:1,
                        transform:'translate(-50%, -50%)',
                        width:'40%',
                        transformOrigin:'center',
                    }
                },{
                    duration:4,
                    ease: "power4.out",
                    css: {
                        clipPath: 'circle(70.7% at 50% 50%)',
                        width:'72%',
                        position: 'absolute',
                        top:'0%',
                        left:'14%',
                        zIndex:1,
                        transform:'translate(0%, 14%)',
                        transformOrigin:'center',
                        marginBottom:'20vw'


                    }
                })   

            
  
    }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);

 

   
  return (
    <section ref={sectionRef} className='container section'>
        <div ref={videoRef}>
            <Video videoWebm={video.webm} videoFallback={video.fallback} videoAlt={video.alt}   isDecriptionDisplayed='false'/> 
        </div>
    </section>

  )
}

export default HomeSingleFeaturedVideo;