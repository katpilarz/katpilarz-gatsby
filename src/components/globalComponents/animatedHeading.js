import React from "react";
import * as styles from "./animatedHeading.module.scss";
import { Link } from "gatsby"
import ArrowIcon from "./arrow";
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);



const AnimatedHeading = ({ headerOne,headerTwo, linkText, linkUrl }) => {


  const sectionRef = useRef(null);

  const headerOneRef = useRef(null);
  const headerTwoRef = useRef(null);
  const linkRef = useRef(null);




  useEffect(() => {
   
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...



      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 67%',
          end:'top 22%',
          scrub: 1,
          pin: false,
          pinSpacing: false,
         
          toggleActions: "restart pause resume none",
          refreshPriority: 1,
        }
      })

      tl.from(headerOneRef.current, {
          duration:2, 
          ease: "sine.out",
          css: {
            xPercent:'-50',
            autoAlpha:0,
          }
        });
        tl.from(headerTwoRef.current, {
          duration:1, 
          ease: "sine.out",
          css: {
          xPercent:'50',
          autoAlpha:0,
          }
      },'-=1.4');
        tl.from(linkRef.current, {
            duration:1, 
            ease: "sine.out",
            css: {
            xPercent:'-50',
            autoAlpha:0,
            }
        },'-=1');

      
      
 
    }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);



  return (

    <div ref={sectionRef} className={styles.header}>
        <div ref={sectionRef} className={styles.headerWrapper}>
          <h3 ref={headerOneRef}>{headerOne}</h3>
          <h3 ref={headerTwoRef}>{headerTwo}</h3>
        </div>
        <Link to={linkUrl} ref={linkRef}>
           {linkText}
            <ArrowIcon arrowIconClass="linkIcon"/>
        </Link>
    </div> 
  )
}

export default AnimatedHeading