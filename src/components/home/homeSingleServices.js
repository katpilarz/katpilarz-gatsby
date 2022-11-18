import React from "react"
import * as styles from "./homeSingleServices.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import Video from "../globalComponents/video";
import MarqueText from "../globalSections/marqueText";
import AnimatedHeading from "../globalComponents/animatedHeading";
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);





const HomeSingleServices = ({ services }) => {


    const sectionRef = useRef([]);

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
                        autoAlpha:0,
                        xPercent:-1,
                    }, {
                        duration: 4,
                        xPercent:-10,
                        autoAlpha:1,
                        ease: "power4.out",
                        scrollTrigger: {
                            id: `section-${index+1}`,
                            trigger: el,
                            start: 'top 80%',
                            toggleActions: "restart pause resume none",
                           
                            refreshPriority: 1,
                            scrub:2,
                        }
                    },'+=7');
             
                });
    
  
      
        }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
        
        return () => ctx.revert(); // cleanup! 
      }, []);
  
  return (
        <section ref={sectionRef} className={`${styles.sectionServices}`}>

            <div className={`${styles.sectionServicesHeader} container`}>
                <AnimatedHeading headerOne='Multidisciplinary' headerTwo='approach' linkText="See All Services" linkUrl="/services"/>
            </div>

            {services.map((service, index) => {
                return (
                <article key={index} className={styles.serviceMarqueeCard} ref={addToRefs}>
                    <Link  to={`/services/${service.node.slug.current}`} className={styles.serviceWrapper}>
                        <MarqueText title={service.node.title}/>
                        <MarqueText title={service.node.title}/>
                        <MarqueText title={service.node.title}/>
                        <MarqueText title={service.node.title}/>
                        <MarqueText title={service.node.title}/>
                        { service.node.video && 
                            <Video key={index} videoWebm={service.node.video.webm} videoFallback={service.node.video.fallback} videoAlt={service.node.video.alt}  videoCustomClass='serviceMedia' isDecriptionDisplayed='false'/>
                        }
                        { service.node.thumbnail &&
                            <GatsbyImage className={styles.serviceMedia}
                                image={getImage(service.node.thumbnail.asset.gatsbyImageData)}
                                alt={`${service.node.thumbnail.alt}`}
                            />
                        }
                        
                    </Link>
                </article>
                )
            })}
        </section>
  )
}

export default HomeSingleServices;