import React from "react";
import * as styles from "./banner.module.scss";
import Btn from "../components/btn";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);



const Banner = ({ name, banner }) => {
  const bannerRef = useRef(null);
  const headerRef = useRef(null);
  const galleryRef = useRef(null);
  const btnRef = useRef(null);
  const missionRef = useRef(null);
  //const description = useRef();


  useEffect(() => {
   
    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    let ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...
      const tl = gsap.timeline()

    tl.from(headerRef.current, {
      delay:.3,
      duration:2, 
      ease: "circe.inOut",
      css: {
        yPercent:'70',
        rotation:.0001
      }
    });
    tl.from(galleryRef.current, {
      duration:2, 
      ease: "circe.inOut",
      css: {
        autoAlpha: 0, 
        yPercent:'70',
        rotation:.0001
      }
    },'-=1.6')
      
 
    
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: bannerRef.current,
        start: "top 7%",
        end: "bottom bottom",
        scrub: 1,
        pin: true,
        toggleActions: "restart pause resume none",
      }
    });
      tl2.to(headerRef.current, {
        duration: 2, 
        ease: "circe.inOut",
        css: {
          height: 'auto',
      }});
      tl2.to(galleryRef.current, {
        duration: 2, 
        ease: "circe.inOut",
        css: {
          autoAlpha: 0,
          opacity:0,
          
      }});
      tl2.from(missionRef.current, {
        duration: 2, 
        ease: "circe.inOut",
        css: {
          autoAlpha: 0,
          opacity:0,
          
      }},'-=2');
      tl2.from(bannerRef.current, {
        duration: 2, 
        ease: "circe.inOut",
        css: {
          height: '100vh',
          
      }},'-=1.6');

  
    }, bannerRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);


  /*
  useEffect(() => {

    const tl = gsap.timeline()

    tl.from(headerRef.current, {
      delay:.3,
      duration:2, 
      ease: "circe.inOut",
      css: {
        yPercent:'70',
        rotation:.0001
      }
    });
    tl.from(galleryRef.current, {
      duration:2, 
      ease: "circe.inOut",
      css: {
        autoAlpha: 0, 
        yPercent:'70',
        rotation:.0001
      }
    },'-=1.6')
      
 
    
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: bannerRef.current,
        start: "top 7%",
        end: "bottom bottom",
        scrub: 1,
        pin: true,
        toggleActions: "restart pause resume none",
      }
    });
      tl2.to(headerRef.current, {
        duration: 2, 
        ease: "circe.inOut",
        css: {
          height: 'auto',
      }});
      tl2.to(galleryRef.current, {
        duration: 2, 
        ease: "circe.inOut",
        css: {
          autoAlpha: 0,
          opacity:0,
          
      }});
      tl2.from(missionRef.current, {
        duration: 2, 
        ease: "circe.inOut",
        css: {
          autoAlpha: 0,
          opacity:0,
          
      }},'-=2');
      tl2.from(bannerRef.current, {
        duration: 2, 
        ease: "circe.inOut",
        css: {
          height: '100vh',
          
      }},'-=1.6');
      /*tl2.to(btnRef.current, {
        position: 'fixed',
        width:'10vw',
        duration: 3,
        repeat:-1, 
        ease: "circe.inOut",
        css: {
          rotation: '360deg',
      }},'-=2')


  
    const onMove = () => {
      
    };
    window.addEventListener("pointermove", onMove);
      
    // cleanup function will be called when component is removed
    return () => {
      tl.kill();
      tl2.scrollTrigger.kill();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);*/


  
 console.log({ banner })

  
  return (
    <section ref={bannerRef} className={styles.banner}>
      <div className={styles.bannerContent}>
        <h1 ref={headerRef} >{name}</h1>
        <h3 ref={missionRef}>{banner.header}</h3>
        <div ref={btnRef}>
          <Btn btnClassName='bannerBtn'/>
        </div> 
        
      </div>
       
      <div ref={galleryRef} className={styles.galleryBanner}>
        {banner.mockups.map((image, index) => {
            return (
                <GatsbyImage key={index} className={styles.gallerySmallImage} 
                  image={getImage(image.asset.gatsbyImageData)}
                  alt={`${image.alt}`}
                />
          )
        })}
      </div> 

      
    </section>
    
  )
}

export default Banner