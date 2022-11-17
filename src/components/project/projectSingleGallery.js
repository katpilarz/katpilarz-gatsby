import React from "react";
import * as styles from "./projectSingleGallery.module.scss";
import AnimatedImage from "../globalComponents/animatedImage";
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);







const ProjectSingleGallery = ({ images, galleryClassName }) => {


  const itemListRef = useRef(null);
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
      // create as many GSAP animations and/or ScrollTriggers here as you want...

      revealRefs.current.forEach((el, index) => {

        gsap.fromTo(el, {
            xPercent:'-2',
            yPercent:'5',
            rotationZ:0,
            rotationX:-20,
            rotationY:5,
            autoAlpha:0, 
            opacity:0,
        }, {
            duration: 4,
            xPercent:0,
            yPercent:0,
            rotationZ:0,
            rotationX:0,
            rotationY:0,
            opacity:1,
            autoAlpha:1,
            ease: "power2.out",
            delay:.1,
            scrollTrigger: {
                id: `section-${index+1}`,
                trigger: el,
                start: 'top 89%',
                end:'top 40%',
               
                toggleActions: "restart pause resume none",
                refreshPriority: 1,
                scrub:1,
            }
        });
 
    });



  
    }, itemListRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);


 
  return (
    <section ref={itemListRef} className={`${styles[galleryClassName]} container`}>
        {images.map((image, index) => {
            return (
            <div className={styles.galleryImages} key={index} ref={addToRefs}>
                <AnimatedImage imagePath={image.asset.gatsbyImageData} imageAlt={image.alt}/> 
           
            </div>
            )
        })}
    </section>
  )
}

export default ProjectSingleGallery