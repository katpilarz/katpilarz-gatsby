import React from "react";
import * as styles from "./pagePreloader.module.scss";
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';


const PagePreloader = ({ transitionStatus }) => {

    const preloaderRef = useRef();
    
    useEffect(() => {

        const tl = gsap.timeline();
        tl.to(preloaderRef.current, {
            //delay:1,
            duration: 2, 
            ease: "circe.inOut",
            css: {
            height:'0vh',
            
            //rotation:.0001
        }})
       
      

    
      const onMove = () => {
        
      };
      window.addEventListener("pointermove", onMove);
        
      // cleanup function will be called when component is removed
      return () => {
        tl.kill();
        window.removeEventListener("pointermove", onMove);
      };
    }, []);
  
  
    

  return (


    <div ref={preloaderRef} className={`${styles.pagePreloader} overlay`}>
        
    </div>

  )
}

export default PagePreloader