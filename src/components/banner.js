import React from "react";
import * as styles from "./banner.module.scss";
import Btn from "../components/btn";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);


const Banner = ({ name, banner }) => {
  const bannerRef = useRef();
  const headerRef = useRef();
  //const description = useRef();
  const btnRef = useRef();
  const galleryRef = useRef();


  /*

  //const addToRefs = useRef();
  const revealRefs = useRef([]);
  revealRefs.current = [];*/

  useEffect(() => {
    const animation1 = gsap.from(headerRef.current, {
      autoAlpha: 0, 
      opacity:0,
      yPercent:'70',
      duration:2, 
      ease: "power4.out"
    });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bannerRef.current,
        start: "top",
        end: "bottom bottom",
        scrub: 2,
        pin: true,
        markers: true,
        toggleActions: "restart pause resume none",
      }
    });
      tl.to(headerRef.current, {
        duration: 2, 
        css: {
          height: 'auto',
          placeSelf: 'flex-start'
        }});


  
    const onMove = () => {
      
    };
    window.addEventListener("pointermove", onMove);
      
    // cleanup function will be called when component is removed
    return () => {
      animation1.kill();
      tl.scrollTrigger.kill();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);


  


  
  return (
    <section ref={bannerRef} className={styles.banner}>
      <div ref={galleryRef} className={styles.galleryBanner}>
        <h1 ref={headerRef}>{name}</h1>
        {banner.mockups.map((image, index) => {
            return (
                <GatsbyImage key={index} className={styles.gallerySmallImage} 
                  image={getImage(image.asset.gatsbyImageData)}
                  alt={`${image.alt}`}
                />
          )
        })}
      </div> 
     
      <div className={styles.bannerContent}>
        <h3 className={styles.bannerHeader}>{banner.header}</h3>
        <div className={styles.bannerBtn} ref={btnRef}>
          <Btn btnClassName='bannerBtn'/>
        </div>
      </div>  
      
    </section>
    
  )
}

export default Banner