import React from "react"
import * as styles from "./homeSingleFocus.module.scss";
import SectionIntro from "../globalSections/sectionIntro";
import Video from "../globalComponents/video";
import AnimatedImage from "../globalComponents/animatedImage";
import Media from "../globalComponents/media";
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect"
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

    useIsomorphicLayoutEffect(() => {
   
        // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
        // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
        let ctx = gsap.context(() => {

                const tl = gsap.timeline({
                    scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 100%",
                    end: "top 37%",
                    scrub:2, 
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
                        xPercent:20,
                    }, {
                        duration: 1,
                        autoAlpha: 1,
                        xPercent:0,
                        ease: "sine.out",
                        scrollTrigger: {
                            id: `section-${index+1}`,
                            trigger: el,
                            start: 'top 80%',
                            end:'top 47%',
                            toggleActions: "restart pause resume none",
                           
                            refreshPriority: 1,
                            scrub:2,
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
                    // Media alternates sides among the lines that have any,
                    // starting at the end of the line, so moving an image to
                    // another line in Sanity never stacks two on one side.
                    const mediaIndex = section.focusAreas.slice(0, index).filter(a => a.image || a.video).length
                    const mediaFirst = (area.image || area.video) && mediaIndex % 2 === 1
                    return (
                    <div className={`${styles.focusArea} ${mediaFirst ? styles.mediaFirst : ''}`} key={index} ref={addToRefs}>
                        <h4 className="text-color">{area.text}</h4>
                        {area.image && area.video === null &&
                            <div className={styles.focusAreaMedia} key={index}>
                                <AnimatedImage imagePath={area.image.asset.gatsbyImageData} imageAlt={area.image.alt}/>   
                            </div>
                        }
                        {area.video &&
                            <div className={styles.focusAreaMedia} key={index}>
                                <Media query="(min-width: 768px)" render={() =>
                                    (
                                        <Video videoWebm={area.video.webm} videoFallback={area.video.fallback}  videoCloudinary={area.video.cloudinaryVideo} videoAlt={area.video.alt} videoCustomClass='focusAreaMedia' isDecriptionDisplayed='false'/>  

                                    )}
                                />
                                
                                <Media query="(max-width: 767px)" render={() =>
                                    (
                                        <AnimatedImage imagePath={area.image.asset.gatsbyImageData} imageAlt={area.image.alt}/> 
                                    )}
                                />
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