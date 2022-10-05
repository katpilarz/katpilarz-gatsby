import React from "react"
import * as styles from "./sectionAbout.module.scss";
import ScrippedText from "../components/scrippedText";
import AnimatedImage from "../components/animatedImage";
import PortableText from "react-portable-text"

import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);





const SectionAbout = ({ section }) => {


    const sectionRef = useRef(null);
    const paragraphRef = useRef(null);
    const headerRef = useRef(null);
    const subheaderRef = useRef(null);


    useEffect(() => {
   
        // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
        // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
        let ctx = gsap.context(() => {


                const tl = gsap.timeline({
                    scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 67%",
                    end: "top 30%",
                    scrub:2, 
                    repeatRefresh: true,
                    toggleActions: "restart pause resume none",
                    }
                });
                tl.from(subheaderRef.current, {
                    duration: 2,
                    ease: "power2.out",
                    css: {
                    autoAlpha: 0,
                    yPercent:'-30',
                }})
                tl.from(headerRef.current, {
                    duration: 2,
                    ease: "power2.out",
                    css: {
                    autoAlpha: 0,
                    yPercent:'30',
                }},'-=2')
                    tl.from(paragraphRef.current, {
                        duration: 4,
                        ease: "power2.out",
                        css: {
                        autoAlpha: 0,
                        yPercent:'30',
                    }},'+=4')

      
        }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
        
        return () => ctx.revert(); // cleanup! 
      }, []);
   
  return (
        <section ref={sectionRef} className={`${styles.sectionAbout} container`}>
            <div className={styles.sectionHeader}>
                <p ref={subheaderRef} className="text-uppercase">{section.subheader}</p>
                <h3 ref={headerRef}>{section.header}</h3>
                <ScrippedText scrippedTextClass="scrippedTextAbout" sectionName="about"/>
            </div>
            <div className={styles.sectionContentWrapper}>   
                <div className={styles.sectionContentLeft}> 
                <div className={styles.aboutImageOne}>
                    <AnimatedImage imagePath={section.imageOne.asset.gatsbyImageData} imageAlt={section.imageOne.alt}/>   
               </div>
                </div> 
                <div className={styles.sectionContentRight}>
                <div className={styles.aboutImageTwo}>
                    <AnimatedImage imagePath={section.imageTwo.asset.gatsbyImageData} imageAlt={section.imageTwo.alt}/>   
               </div>
                <div  className={styles.aboutDescription} ref={paragraphRef}>    
                    <PortableText
                        content={section._rawDescription}
                        projectId={process.env.GATSBY_SANITY_PROJECT_ID}
                        dataset={process.env.GATSBY_SANITY_DATASET}
                    />
                </div>
                </div>
                
            </div>
            
        </section>
  )
}

export default SectionAbout;