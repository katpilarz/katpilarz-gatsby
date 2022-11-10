import React from "react"
import * as styles from "./sectionIntro.module.scss";
import Icon from "../globalComponents/icon";
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);




const SectionIntro = ({ subheader }) => {



  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const iconRef = useRef(null);
  const paragraphRef = useRef(null);

 
  useEffect(() => {
   
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {


      const animation = gsap.matchMedia()
          animation.add()


          
          animation.add("(min-width:  1025px)", () => {

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 57%",
                end: "top 27%",
                scrub:.5, 
                repeatRefresh: true,
                toggleActions: 'play none none reverse'
                //toggleActions: "restart pause resume none",
              }
            });
              tl.from(iconRef.current, {
                  duration: 4,
                  ease: "power4.out",
                  css: {
                    autoAlpha: 0,
                    opacity:0, 
                    rotation:360*3,
              }})
      
              tl.from(lineRef.current, {
                duration: 2,
                ease: "power4.out",
                css: {
                  transformOrigin:'top',
                  autoAlpha: 0,
                  opacity:0, 
                  height:'0vw',
                }},'-=3.7')
                tl.from(paragraphRef.current, {
                  duration: 1,
                  ease: "power4.out",
                  css: {
                    autoAlpha: 0,
                    opacity:0, 
              }},'-=1.7')

    
          })


          animation.add("(max-width: 1024px)", () => {

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 77%",
                end: "top 47%",
                scrub:.5, 
                repeatRefresh: true,
                toggleActions: 'play none none reverse'
                //toggleActions: "restart pause resume none",
              }
            });
              tl.from(iconRef.current, {
                  duration: 4,
                  ease: "power4.out",
                  css: {
                    autoAlpha: 0,
                    opacity:0, 
                    rotation:360*3,
              }})
      
              tl.from(lineRef.current, {
                duration: 2,
                ease: "power4.out",
                css: {
                  transformOrigin:'top',
                  autoAlpha: 0,
                  opacity:0, 
                  height:'0vw',
                }},'-=3.7')
                tl.from(paragraphRef.current, {
                  duration: 1,
                  ease: "power4.out",
                  css: {
                    autoAlpha: 0,
                    opacity:0, 
              }},'-=1.7')
  
    
          })


        
            
  
    }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);


  
  return (
    <div ref={sectionRef} className={styles.sectionIntro}>
      <div ref={iconRef}>
            <Icon iconClass="sectionIcon"/>
      </div>
      <div ref={lineRef} className={`${styles.line} line-intro`}></div>
      <p ref={paragraphRef} className="text-uppercase">{subheader}</p>
    </div>
  )
}

export default SectionIntro;