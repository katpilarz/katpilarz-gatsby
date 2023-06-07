import React from "react";
import * as styles from "./description.module.scss";
import PortableText from "react-portable-text"
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);




const Description = ({ description, descriptionCustomClass  }) => {


  const descriptionRef = useRef(null);


  useEffect(() => {
   
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {


      const animation = gsap.matchMedia()
          animation.add()


          
          animation.add("(min-width:  569px)", () => {
  
            const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: descriptionRef.current,
                  start: "top 80%",
                  end: "top 40%",
                  scrub:2, 
                  repeatRefresh: true,
                  toggleActions: "restart pause resume none",
                }
              });
    
                tl.from(descriptionRef.current, {
                    duration: 1,
                    ease: "power2.out",
                    css: {
                    autoAlpha: 0,
                    opacity:0,
                    yPercent:'50'
                }})
    
          })


          animation.add("(max-width: 568px)", () => {

            const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: descriptionRef.current,
                  start: "top 87%",
                  end: "top 52%",
                  scrub:2, 
                  repeatRefresh: true,
                  toggleActions: "restart pause resume none",
                }
              });
    
                tl.from(descriptionRef.current, {
                    duration: 1,
                    ease: "power2.out",
                    css: {
                    autoAlpha: 0,
                    opacity:0,
                    yPercent:'20'
                }})
    
          })


        
            
  
    }, descriptionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);

  return (
        <div ref={descriptionRef} className={`${styles.description} ${styles[descriptionCustomClass]}`}>
            <PortableText 
                content={description}
                projectId={process.env.GATSBY_SANITY_PROJECT_ID}
                dataset={process.env.GATSBY_SANITY_DATASET}
            />
        </div>
  )
}

export default Description