import * as React from "react"
import * as styles from "./serviceSingleTechnologies.module.scss";
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);






const ServiceSingleTechnologies = ({ technologies }) => {

 const sectionRef = useRef(null)

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
                    xPercent:'-15',
                }, {
                    duration: 1,
                    autoAlpha: 1,
                    xPercent:0,
                    ease: "power4.out",
                    stagger:2,
                    delay:1,
                    scrollTrigger: {
                        id: `section-${index+1}`,
                        trigger: el,
                        start: 'top 70%',
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
        <div ref={sectionRef} className='container'>
            <p className="text-uppercase">Technologies I use</p>
            <div className={`${styles.technologies}`}>
                {technologies.map((item, index) => {
                    return(
                    <div className={styles.itemWrapper} key={index} ref={addToRefs}>
                        <h5>{`${index+1}`}</h5>
                        <h5>{item.text}</h5>
                    </div> 
                    )
                })}
            </div>
        </div>
  );
};

export default ServiceSingleTechnologies;