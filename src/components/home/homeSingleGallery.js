import React from "react"
import * as styles from "./homeSingleGallery.module.scss";
import Video from "../globalComponents/video";
import AnimatedImage from "../globalComponents/animatedImage";
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);




const HomeSingleGallery = ({ gallery }) => {

 const galleryItems = gallery


 const sectionRef = useRef(null)

  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = el => {
      if (!revealRefs.current.includes(el)) {
          revealRefs.current.push(el);
      }
  };

  useEffect(() => {
   
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {


            revealRefs.current.forEach((el, index) => {

                gsap.fromTo(el, {
                    autoAlpha: 0,
                    xPercent:'15',
                    scale:.7,
                    transformOrigin:'right',
                }, {
                    duration: 1,
                    autoAlpha: 1,
                    xPercent:0,
                    scale:1,
                    transformOrigin:'right',

                    ease: "power4.out",
                    stagger:2,
                    delay:4,
                    scrollTrigger: {
                        id: `section-${index+1}`,
                        trigger: el,
                        start: 'top 80%',
                        end:'top 40%',
                        toggleActions: "restart pause resume none",
                        //toggleActions: 'play none none reverse',
                        refreshPriority: 1,
                        scrub:2,
                    }
                });
         
            });


  
    }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);

 

   
  return (
    <section ref={sectionRef} className={`${styles.sectionGallery} container`}>
        
            <div className={styles.sectionGalleryWrapper}>
            {galleryItems.map((item, index) => {
                return (
                    <div key={index} className={styles.projectMockup} ref={addToRefs}>
                        {item.webm &&
                            <Video videoWebm={item.webm} videoFallback={item.fallback} videoAlt={item.alt} videoCustomClass='projectPrototype' isDecriptionDisplayed='false'/> 
                        }
                        {item.asset &&
                            <AnimatedImage imagePath={item.asset.gatsbyImageData} imageAlt={item.alt}/>   
                        }
                    </div>
                
                )
            })}
            </div>
    </section>

  )
}

export default HomeSingleGallery;