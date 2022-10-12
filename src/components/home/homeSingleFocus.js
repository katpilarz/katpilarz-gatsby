import React from "react"
import * as styles from "./homeSingleFocus.module.scss";
import SectionIntro from "../global/sectionIntro";
import Video from "../global/video";
import AnimatedImage from "../global/animatedImage";
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);




const HomeSingleFocus = ({ section, header }) => {

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
                    start: "top 77%",
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
                            //toggleActions: 'play none none reverse',
                            refreshPriority: 1,
                            scrub:2,
                        }
                    });
             
                });
    
  
      
        }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
        
        return () => ctx.revert(); // cleanup! 
      }, []);

  
  return (
        <section className={styles.sectionFocus}>
            <h3 ref={headerRef}>{header}</h3>
            <SectionIntro subheader={section.subheader}/>
            <div ref={sectionRef} className={styles.focusAreasWrapper}>
                {section.focusAreas.map( (area, index) => {
                    return (
                    <div className={styles.focusArea} key={index} ref={addToRefs}>
                        <h4>{area.text}</h4>
                        <div className={styles.focusAreaMedia} key={index}>
                            {area.image &&
                                <AnimatedImage imagePath={area.image.asset.gatsbyImageData} imageAlt={area.image.alt}/>   
                            }

                            {area.video &&
                                <Video video={area.video} videoCustomClass='focusAreaMedia' isDecriptionDisplayed='false'/>  
                            }
                        </div>
                    </div>
                    )
                })}
            </div>
            
        </section>
  )
}

export default HomeSingleFocus;