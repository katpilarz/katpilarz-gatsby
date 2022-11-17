import React from "react"
import * as styles from "./homeSingleFocus.module.scss";
import SectionIntro from "../globalSections/sectionIntro";
import Video from "../globalComponents/video";
import AnimatedImage from "../globalComponents/animatedImage";
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);




const HomeSingleFocus = ({ section}) => {

    const sectionRef = useRef(null);

    const headerRef = useRef(null)

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


                const tl = gsap.timeline({
                    scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 100%",
                    end: "top 37%",
                    scrub:1, 
                    repeatRefresh: true,
                    toggleActions: "restart pause resume none",
                    }
                });
                    tl.from(headerRef.current, {
                        duration: 1,
                        ease: "power2.out",
                        css: {
                        autoAlpha: 0,
                        yPercent:'30',
                    }})



                revealRefs.current.forEach((el, index) => {

                    gsap.fromTo(el, {
                        autoAlpha: 0,
                        xPercent:15,
                    }, {
                        duration: 1,
                        autoAlpha: 1,
                        xPercent:0,
                        ease: "power4.out",
                        stagger:2,
                        delay:.97,
                        scrollTrigger: {
                            id: `section-${index+1}`,
                            trigger: el,
                            start: 'top 80%',
                            end:'top 34%',
                            toggleActions: "restart pause resume none",
                           
                            refreshPriority: 1,
                            scrub:1,
                        }
                    });
             
                });
    
  
      
        }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
        
        return () => ctx.revert(); // cleanup! 
      }, []);



  return (
        <section className={`${styles.sectionFocus} container`}>
            <h3 ref={headerRef}>{section.header}</h3>
            <SectionIntro subheader={section.subheader}/>
            <div ref={sectionRef} className={styles.focusAreasWrapper}>
                {section.focusAreas.map( (area, index) => {
                    return (
                    <div className={styles.focusArea} key={index} ref={addToRefs}>
                        <h4 className="text-color">{area.text}</h4>
                        {area.image &&
                            <div className={styles.focusAreaMedia} key={index}>
                                <AnimatedImage imagePath={area.image.asset.gatsbyImageData} imageAlt={area.image.alt}/>   
                            </div>
                        }
                        {area.video &&
                            <div className={styles.focusAreaMedia} key={index}>
                                <Video videoWebm={area.video.webm} videoFallback={area.video.fallback} videoAlt={area.video.alt} videoCustomClass='focusAreaMedia' isDecriptionDisplayed='false'/>  
                            </div>
                        }
                    </div>
                    )
                })}
            </div>
        </section>
  )
}

export default HomeSingleFocus;