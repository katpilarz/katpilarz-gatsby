import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from "./animatedImage.module.scss";
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);





const AnimatedImage = ({ imageAlt, imagePath }) => {


    const imageRef = useRef(null);
  

    useEffect(() => {
   
        // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
        // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
        let ctx = gsap.context(() => {


                const tl = gsap.timeline({
                    scrollTrigger: {
                    trigger: imageRef.current,
                    start: "top 57%",
                    end: "top 7%",
                    scrub:1, 
                    repeatRefresh: true,
                    toggleActions: "restart pause resume none",
                    }
                });
                tl.from(imageRef.current, {
                    duration: 2,
                    ease: "sine.out",
                    css: {
                    scale:1.27,
                    transformOrigin:'top'
                }})

      
        }, imageRef); // <- scopes all selector text inside the context to this component (optional, default is document)
        
        return () => ctx.revert(); // cleanup! 
      }, []);
   
  return (
        <div className={`${styles.imageContainer}`}>
            <div className={styles.imageWrapper} ref={imageRef}>    
                <GatsbyImage className={styles.image}
                    image={getImage(imagePath)}
                alt={`${imageAlt}`}/>
            </div> 
        </div>
  )
}

export default AnimatedImage;