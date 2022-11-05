import React from "react"
import * as styles from "./sectionAbout.module.scss";
import ScrippedText from "../globalComponents/scrippedText";
import SectionAboutDetails from "./sectionAboutDetails";
import SectionIntro from "./sectionIntro";

import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);





const SectionAbout = ({ section }) => {


    const sectionRef = useRef(null);
    const headerRef = useRef(null);


    useEffect(() => {
   
        // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
        // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
        let ctx = gsap.context(() => {


                const tl = gsap.timeline({
                    scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    end: "top 30%",
                    scrub:2, 
                    repeatRefresh: true,
                    toggleActions: "restart pause resume none",
                    }
                });
                tl.from(headerRef.current, {
                    duration: 2,
                    ease: "power2.out",
                    css: {
                    autoAlpha: 0,
                    yPercent:'50',
                }})
      
        }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
        
        return () => ctx.revert(); // cleanup! 
      }, []);
   
  return (
        <section ref={sectionRef} className={`${styles.sectionAbout}`}>
            <SectionIntro subheader={ section.subheader}/>
            <div className={styles.sectionHeader}>
                <h3 ref={headerRef}>{section.header}</h3>
                <ScrippedText scrippedTextClass="scrippedTextAbout" sectionName="about"/>
            </div>
            <SectionAboutDetails text={section._rawDescription} imageOne={section.imageOne} imageTwo={section.imageTwo} video={section.video}/>
            
        </section>
  )
}

export default SectionAbout;