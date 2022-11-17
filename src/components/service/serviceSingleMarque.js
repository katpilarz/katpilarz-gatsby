import React from "react"
import * as styles from "./serviceSingleMarque.module.scss";
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
import MarqueText from "../globalSections/marqueText";
gsap.registerPlugin(ScrollTrigger);





const ServiceSingleMarque = () => {


    const sectionRef = useRef(null);

    const marqueRefOne = useRef(null);
    const marqueRefTwo = useRef(null);
    const marqueRefThree = useRef(null);
    const marqueRefFour = useRef(null);

 


    useEffect(() => {
   
        // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
        // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
        let ctx = gsap.context(() => {



                    gsap.fromTo(marqueRefOne.current, {
                        xPercent:'-1',
                        autoAlpha:0,
                    }, {
                        duration: 4,
                        autoAlpha:1,
                        xPercent:'-20',
                        ease: "power4.out",
                        scrollTrigger: {
                            id: marqueRefOne.current,
                            trigger: marqueRefOne.current,
                            start: 'top 77%',
                            toggleActions: "restart pause resume none",
                            refreshPriority: 1,
                            scrub:1,
                        }
                    });
                    gsap.fromTo(marqueRefTwo.current, {
                        xPercent:'-1',
                        autoAlpha:0,
                    }, {
                        duration: 4,
                        autoAlpha:1,
                        xPercent:'-20',
                        ease: "power4.out",
                        delay:1,
                        scrollTrigger: {
                            id: marqueRefTwo.current,
                            trigger: marqueRefTwo.current,
                            start: 'top 77%',
                            toggleActions: "restart pause resume none",
                            refreshPriority: 1,
                            scrub:1,
                        }
                    });

                    gsap.fromTo(marqueRefThree.current, {
                        xPercent:'-1',
                        autoAlpha:0,
                    }, {
                        duration: 4,                        
                        autoAlpha:1,
                        xPercent:-10,
                        ease: "power4.out",
                        delay:.5,
                        scrollTrigger: {
                            id: marqueRefThree.current,
                            trigger: marqueRefThree.current,
                            start: 'top 77%',
                            toggleActions: "restart pause resume none",
                            refreshPriority: 1,
                            scrub:1,
                        }
                    });
                    gsap.fromTo(marqueRefFour.current, {
                        xPercent:'-1',
                        autoAlpha:0,
                    }, {
                        duration: 4,
                        autoAlpha:1,
                        xPercent:-10,
                        ease: "power4.out",
                        delay:.5,
                        scrollTrigger: {
                            id: marqueRefFour.current,
                            trigger: marqueRefFour.current,
                            start: 'top 77%',
                            toggleActions: "restart pause resume none",
                            refreshPriority: 1,
                            scrub:1,
                        }
                    });


  
      
        }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
        
        return () => ctx.revert(); // cleanup! 
      }, []);
  
  return (
        <section ref={sectionRef} className={`${styles.sectionServices}`}>
                <article className={styles.serviceMarqueeCard} >
                    <div className={styles.serviceSingleWrapper} ref={marqueRefOne}>
                        <MarqueText title="Helping Brands"/>
                        <MarqueText title="Create"/>
                        <MarqueText title="Outstanding Experience"/>
                        <MarqueText title="Helping Brands"/>
                        <MarqueText title="Create"/>
                    </div>
                </article>
                <article className={styles.serviceMarqueeCard} >
                    <div className={styles.serviceSingleWrapper} ref={marqueRefTwo}>
                        <MarqueText title="Helping Brands"/>
                        <MarqueText title="Achieve More"/>
                        <MarqueText title="Helping Brands"/>
                        <MarqueText title="Achieve More"/>
                    </div>
                </article>
                <article className={styles.serviceMarqueeCard} >
                    <div className={styles.serviceSingleWrapper} ref={marqueRefThree}>
                        <MarqueText title="Helping Brands"/>
                        <MarqueText title="Create"/>
                        <MarqueText title="Outstanding Experience"/>
                        <MarqueText title="Helping Brands"/>
                        <MarqueText title="Create"/>
                    </div>
                </article>
                <article className={styles.serviceMarqueeCard} >
                    <div className={styles.serviceSingleWrapper} ref={marqueRefFour}>
                        <MarqueText title="Helping Brands"/>
                        <MarqueText title="Achieve More"/>
                        <MarqueText title="Helping Brands"/>
                        <MarqueText title="Achieve More"/>
                    </div>
                </article>
                
        </section>
  )
}

export default ServiceSingleMarque;