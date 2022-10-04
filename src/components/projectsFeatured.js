import React from "react";
import * as styles from "./projectsFeatured.module.scss";
import { Link } from "gatsby"
import ProjectBanner from "../components/projectBanner";

import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);







const ProjectsFeatured = ({ featuredProjects }) => {






const sectionRef = useRef(null);
const panelRef = useRef(null);


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

/*

        gsap.to(".panel:not(:last-child)", {
            yPercent: -100, 
            ease: "none",
            stagger: 0.5,
            scrollTrigger: {
            trigger: sectionRef,
            start: "top top",
            end: "+=300%",
            scrub: true,
            pin: true
            }
        });
  */



            revealRefs.current.forEach((el, index) => {

                gsap.fromTo(el, {
                    autoAlpha:0,
                    stagger:.4,
                }, {
                    duration: 4,
                    autoAlpha:1,
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
                        pinSpacing: true,
                        scrub: true,
                    }
                });

                
         
            })

            gsap.set(addToRefs, {zIndex: (i, target, targets) => targets.length - i});


  
    }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);



    return (
        <section ref={sectionRef} className="container">
            {featuredProjects.map((project, index) => {
                return (
                <article className={styles.article} key={index} ref={addToRefs}>
                    <Link  to={`/projects/${project.node.slug.current}`}>
                        <ProjectBanner project={project.node} isSwiper='true'/>
                    </Link>
                </article>
                )
            })}
        </section>
    )
}

export default ProjectsFeatured