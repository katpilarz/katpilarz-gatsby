import React from "react"
import * as styles from "./sectionIntro.module.scss";
import Icon from "../globalComponents/icon";
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);




const SectionIntro = ({ subheader }) => {



  const sectionIntroRef = useRef(null);
  const lineRef = useRef(null);
  const iconRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
   
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionIntroRef.current,
          start: "top 90%",
          end: "top 37%",
          scrub:1, 
          repeatRefresh: true,
          toggleActions: 'play none none reverse'
          //toggleActions: "restart pause resume none",
        }
      });
        tl.from(iconRef.current, {
            duration: 1,
            ease: "power4.out",
            css: {
              autoAlpha: 0,
              opacity:0, 
              rotation:'-360deg'
        }})

        tl.from(lineRef.current, {
          duration: 2,
          ease: "power4.out",
          css: {
            transformOrigin:'top',
            autoAlpha: 0,
            opacity:0, 
            height:'0vw',
          }},'-=.5')
          tl.from(paragraphRef.current, {
            duration: 1,
            ease: "power4.out",
            css: {
              autoAlpha: 0,
              opacity:0, 
        }},'-=1')
          tl.to(iconRef.current, {
            duration: 1,
            ease: "power4.out",
            css: {
              rotation:'360deg'
        }},'-=2')

  
    }, sectionIntroRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);




  
  return (
    <div ref={sectionIntroRef} className={styles.sectionIntro}>
      <div ref={iconRef}>
            <Icon iconClass="sectionIcon"/>
      </div>
      <div ref={lineRef} className={`${styles.line} line-intro`}></div>
      <p ref={paragraphRef} className="text-uppercase">{subheader}</p>
    </div>
  )
}

export default SectionIntro;