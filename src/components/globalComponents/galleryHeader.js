import React from "react";
import * as styles from "./galleryHeader.module.scss";
import { Link } from "gatsby"
import ArrowIcon from "./arrow";
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);



const GalleryHeader = ({ header, linkText, linkUrl }) => {


  const sectionRef = useRef(null);

  const headerRef = useRef(null);
  const linkRef = useRef(null);




  useEffect(() => {
   
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...



      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%',
          end:'top 25%',
          scrub: 1,
          pin: false,
          pinSpacing: false,
          //toggleActions: "restart pause resume none",
          toggleActions: 'play none none reverse',
          refreshPriority: 1,
        }
      })

      tl.from(headerRef.current, {
          duration:2, 
          ease: "power2.out",
          css: {
            xPercent:'50',
            autoAlpha:0,
          }
        });
        tl.from(linkRef.current, {
            duration:1, 
            ease: "power2.out",
            css: {
            xPercent:'-50',
            autoAlpha:0,
            }
        },'-=2');

      
      
 
    }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);



  return (

    <div ref={sectionRef} className={styles.header}>
        <h3 ref={headerRef}>{header}</h3>
        <Link to={linkUrl} ref={linkRef}>
           {linkText}
            <ArrowIcon arrowIconClass="linkIcon"/>
        </Link>
    </div> 
  )
}

export default GalleryHeader