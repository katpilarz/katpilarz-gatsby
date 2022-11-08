import React from "react"
import * as styles from "./serviceSingleMarque.module.scss";
import Icon from "../globalComponents/icon";


import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);





const ServiceSingleMarque = ({}) => {


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
                            start: 'top 87%',
                            //end:'top 10%',
                            toggleActions: "restart pause resume none",
                            //toggleActions: 'play none none reverse',
                            refreshPriority: 1,
                            scrub:2,
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
                            start: 'top 87%',
                            //end:'top 10%',
                            toggleActions: "restart pause resume none",
                            //toggleActions: 'play none none reverse',
                            refreshPriority: 1,
                            scrub:2,
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
                            start: 'top 87%',
                            //end:'top 10%',
                            toggleActions: "restart pause resume none",
                            //toggleActions: 'play none none reverse',
                            refreshPriority: 1,
                            scrub:2,
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
                            start: 'top 87%',
                            //end:'top 10%',
                            toggleActions: "restart pause resume none",
                            //toggleActions: 'play none none reverse',
                            refreshPriority: 1,
                            scrub:2,
                        }
                    });


  
      
        }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
        
        return () => ctx.revert(); // cleanup! 
      }, []);
  
  return (
        <section ref={sectionRef} className={`${styles.sectionServices}`}>
                <article className={styles.serviceMarqueeCard} >
                    <div className={styles.serviceSingleWrapper} ref={marqueRefOne}>
                        <div className={styles.serviceSingle}>
                            <h4 className="text-color">Helping Brands</h4>
                            <Icon iconClass="sectionServiceIcon"/>
                        </div>
                        <div className={styles.serviceSingle}>
                            <h4 className="text-color">Create</h4>
                            <Icon iconClass="sectionServiceIcon"/>
                        </div>
                        <div className={styles.serviceSingle}>
                            <h4 className="text-color">Outstanding Experience</h4>
                            <Icon iconClass="sectionServiceIcon"/>
                        </div>
                        <div className={styles.serviceSingle}>
                            <h4 className="text-color">Helping Brands</h4>
                            <Icon iconClass="sectionServiceIcon"/>
                        </div>
                    </div>
                </article>
                <article className={styles.serviceMarqueeCard} >
                    <div className={styles.serviceSingleWrapper} ref={marqueRefTwo}>
                        <div className={styles.serviceSingle}>
                            <h4 className="text-color">Helping Brands</h4>
                            <Icon iconClass="sectionServiceIcon"/>
                        </div>
                        <div className={styles.serviceSingle}>
                            <h4 className="text-color">Achieve More</h4>
                            <Icon iconClass="sectionServiceIcon"/>
                        </div>
                        <div className={styles.serviceSingle}>
                            <h4 className="text-color">Helping Brands</h4>
                            <Icon iconClass="sectionServiceIcon"/>
                        </div>
                        <div className={styles.serviceSingle}>
                            <h4 className="text-color">Achieve More</h4>
                            <Icon iconClass="sectionServiceIcon"/>
                        </div>
                    </div>
                </article>
                <article className={styles.serviceMarqueeCard} >
                    <div className={styles.serviceSingleWrapper} ref={marqueRefThree}>
                        <div className={styles.serviceSingle}>
                            <h4 className="text-color">Helping Brands</h4>
                            <Icon iconClass="sectionServiceIcon"/>
                        </div>
                        <div className={styles.serviceSingle}>
                            <h4 className="text-color">Create</h4>
                            <Icon iconClass="sectionServiceIcon"/>
                        </div>
                        <div className={styles.serviceSingle}>
                            <h4 className="text-color">Outstanding Experience</h4>
                            <Icon iconClass="sectionServiceIcon"/>
                        </div>
                        <div className={styles.serviceSingle}>
                            <h4 className="text-color">Helping Brands</h4>
                            <Icon iconClass="sectionServiceIcon"/>
                        </div>
                    </div>
                </article>
                <article className={styles.serviceMarqueeCard} >
                    <div className={styles.serviceSingleWrapper} ref={marqueRefFour}>
                        <div className={styles.serviceSingle}>
                            <h4 className="text-color">Helping Brands</h4>
                            <Icon iconClass="sectionServiceIcon"/>
                        </div>
                        <div className={styles.serviceSingle}>
                            <h4 className="text-color">Achieve More</h4>
                            <Icon iconClass="sectionServiceIcon"/>
                        </div>
                        <div className={styles.serviceSingle}>
                            <h4 className="text-color">Helping Brands</h4>
                            <Icon iconClass="sectionServiceIcon"/>
                        </div>
                        <div className={styles.serviceSingle}>
                            <h4 className="text-color">Achieve More</h4>
                            <Icon iconClass="sectionServiceIcon"/>
                        </div>
                    </div>
                </article>
                
        </section>
  )
}

export default ServiceSingleMarque;