import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from "./homeSingleServices.module.scss";
import { Link } from "gatsby"
import Video from "../globalComponents/video";
import HomeSingleServicesSingle from "./homeSingleServicesSingle";

import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);





const HomeSingleServices = ({ services }) => {


    const sectionRef = useRef([]);

    const paragraphRef = useRef([]);

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
                    trigger: sectionRef.current,
                    start: "top 90%",
                    end: "top 50%",
                    scrub:2, 
                    repeatRefresh: true,
                    toggleActions: "restart pause resume none",
                    }
                });
                    tl.from(paragraphRef.current, {
                        duration: 1,
                        ease: "power4.out",
                        css: {
                        autoAlpha: 0,
                        xPercent:'5',
                    }})

                revealRefs.current.forEach((el, index) => {

                    gsap.fromTo(el, {
                        xPercent:-1,
                    }, {
                        duration: 4,
                        xPercent:-10,
                        ease: "power4.out",
                        delay:.1,
                        scrollTrigger: {
                            id: `section-${index+1}`,
                            trigger: el,
                            start: 'top 90%',
                            end:'top 10%',
                            toggleActions: "restart pause resume none",
                            //toggleActions: 'play none none reverse',
                            refreshPriority: 1,
                            scrub:3,
                        }
                    });
             
                });
    
  
      
        }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
        
        return () => ctx.revert(); // cleanup! 
      }, []);
  
  return (
        <section ref={sectionRef} className={`${styles.sectionServices}`}>
            <p ref={paragraphRef} className="text-uppercase">Project Multidisciplinary Approach</p>

            {services.map((service, index) => {
                return (
                <article key={index} className={styles.serviceMarqueeCard} ref={addToRefs}>
                    <Link  to={`/services/${service.node.slug.current}`} className={styles.serviceWrapper}>
                        <HomeSingleServicesSingle title={service.node.title}/>
                        <HomeSingleServicesSingle title={service.node.title}/>
                        <HomeSingleServicesSingle title={service.node.title}/>
                        <HomeSingleServicesSingle title={service.node.title}/>
                        <HomeSingleServicesSingle title={service.node.title}/>
                        { service.node.video && 
                            <Video key={index} videoWebm={service.node.video.webm} videoFallback={service.node.video.fallback} videoAlt={service.node.video.alt}  videoCustomClass='serviceMedia' isDecriptionDisplayed='false'/>
                        }
                        { service.node.image &&
                            <GatsbyImage className={styles.serviceMedia}
                                image={getImage(service.node.image.asset.gatsbyImageData)}
                                alt={`${service.node.image.alt}`}
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