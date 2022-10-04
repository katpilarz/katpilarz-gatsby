import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from "./sectionFocus.module.scss";
import SectionIntro from "../components/sectionIntro";
import Video from "../components/video";
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);




const SectionFocus = ({ section }) => {


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

                revealRefs.current.forEach((el, index) => {

                    gsap.fromTo(el, {
                        autoAlpha: 0,
                        xPercent:5,
                        yPercent:5,
                    }, {
                        duration: 1,
                        autoAlpha: 1,
                        xPercent:0,
                        yPercent:0,
                        ease: "power4.out",
                        delay:.77,
                        scrollTrigger: {
                            id: `section-${index+1}`,
                            trigger: el,
                            start: 'top 80%',
                            end:'top 34%',
                            toggleActions: "restart pause resume none",
                            //toggleActions: 'play none none reverse',
                            refreshPriority: 1,
                            scrub:1,
                        }
                    });
             
                });
    
  
      
        }, addToRefs); // <- scopes all selector text inside the context to this component (optional, default is document)
        
        return () => ctx.revert(); // cleanup! 
      }, []);

  
  return (
        <section className={styles.sectionFocus}>
            <SectionIntro subheader={section.subheader}/>
            <div className={styles.focusAreasWrapper}>
                {section.focusAreas.map( (area, index) => {
                    return (
                    <div className={styles.focusArea} key={index} ref={addToRefs}>
                        <h4>{area.text}</h4>
                        <div className={styles.focusAreaMedia} key={index}>
                            {area.image &&
                                <GatsbyImage 
                                    image={getImage(area.image.asset.gatsbyImageData)}
                                    alt={`${area.image.alt}`}
                                />
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

export default SectionFocus;