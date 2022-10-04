import React from "react";
import * as styles from "./pagePreloader.module.scss";
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';


const PagePreloader = ({ transitionStatus }) => {

    const preloaderRef = useRef();

    useEffect(() => {
   
        // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
        // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
        let ctx = gsap.context(() => {


            const tl = gsap.timeline();
            tl.to(preloaderRef.current, {
                delay:.3,
                duration: 2, 
                ease: "power2.out",
                css: {
                height:'0vh',
                
            }})
      
        }, preloaderRef); // <- scopes all selector text inside the context to this component (optional, default is document)
        
        return () => ctx.revert(); // cleanup! 
      }, []);
    
  
    

  return (


    <div ref={preloaderRef} className={`${styles.pagePreloader} overlay`}>
        
    </div>

  )
}

export default PagePreloader