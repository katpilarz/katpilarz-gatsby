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

    const focusItemRef = useRef(null);

    useEffect(() => {
   
        // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
        // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
        let ctx = gsap.context(() => {
          // create as many GSAP animations and/or ScrollTriggers here as you want...
              const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: focusItemRef.current,
                    start: "top 70%",
                    end: "top 20%",
                    scrub: 1,
                    toggleActions: "restart pause resume none",
                }
                });
                tl.from(focusItemRef.current, {
                    duration:6,
                    stagger:1.6,
                    ease: "circe.out",
                    css: {
                      opacity: 0,
                      xPercent:'40',
                }},'-=1')
  
      
        }, focusItemRef); // <- scopes all selector text inside the context to this component (optional, default is document)
        
        return () => ctx.revert(); // cleanup! 
      }, []);

  
  return (
        <section className={styles.sectionFocus}>
            <SectionIntro subheader={section.subheader}/>
            <div className={styles.focusAreasWrapper}>
                {section.focusAreas.map( (area, index) => {
                    return (
                    <div className={styles.focusArea} key={index} ref={focusItemRef}>
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