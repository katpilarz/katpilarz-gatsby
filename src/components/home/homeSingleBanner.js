import React from "react";
import * as styles from "./homeSingleBanner.module.scss";
import { useEffect, useRef } from 'react';
import Btn from "../global/btn";

import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);




const HomeSingleBanner = ({ name, title, images }) => {
  const introRef = useRef(null);
  const introContentRef = useRef(null);
  const headerRef = useRef(null);
  const jobRef = useRef(null);
  const btnRef = useRef(null);


  const sectionRef = useRef(null);

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
      // create as many GSAP animations and/or ScrollTriggers here as you want...

      //this is component intro timeline
      const tl = gsap.timeline()

      tl.from(introContentRef.current, {
        delay:.3,
          duration:2, 
          ease: "power2.out",
          css: {
            autoAlpha: 0, 
            yPercent:'140',
          }
        });





       //this is component scroll triggered timeline  

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: "bottom bottom",
          end: "bottom -100%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          //toggleActions: "restart pause resume none",
          toggleActions: 'play none none reverse',
          refreshPriority: 1,
        }
      });
      tl2.to(headerRef.current, {
        delay:1,
        duration:1, 
        ease: "power2.out",
        css: {
          yPercent:'-10',
        }
      });
      tl.to(btnRef.current, {
        duration: 14,
        ease: "circe.inOut",
        css: {
          rotation: '360deg',
    }})
      tl2.to(jobRef.current, {
        duration:1, 
        ease: "power2.out",
        css: {
          autoAlpha: 0, 
          yPercent:'10',
        }
      },'-=1');
      tl2.to(headerRef.current, {
        duration:1, 
        ease: "power2.out",
        css: {
          autoAlpha: 0, 
          yPercent:'-100',
        }
      });

      tl2.to(introContentRef.current, {
        duration:1, 
        ease: "power2.out",
        css: {
          autoAlpha: 0, 
        }
      },'-=2');

      tl2.to(sectionRef.current, {
        duration:2, 
        ease: "power2.out",
        css: {
          xPercent: '80', 
          yPercent:'50',
          scale:3.9,
        }
      });

      tl2.to(sectionRef.current, {
        duration:1, 
        ease: "power2.out",
        css: {
          autoAlpha:0.0, 
          opacity:0.0,
        }
      });




      revealRefs.current.forEach((el, index) => {

        gsap.fromTo(el, {
            yPercent:20,
            xPercent:20,
            opacity:0,
            autoAlpha:0,
            scale:.6,
        }, {
            duration: 2,
            xPercent:0,
            yPercent:0,
            opacity:1,
            autoAlpha:1,
            scale:1.1,
            ease: "power4.out",
            //stagger:4,
            delay:6,
            scrollTrigger: {
                id: `section-${index+1}`,
                trigger: el,
                start: 'top 30%',
                end:'top 7%',
                //toggleActions: "restart pause resume none",
                toggleActions: 'play none none reverse',
                refreshPriority: 1,
                pin: false,
                pinSpacing: false,
                scrub:3,
            }
        });
 
    });



      
 
    }, introRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);





  
  return (
      <div ref={introRef} className={`${styles.intro} intro`}>
        <div ref={introContentRef} className={styles.introContent}>
          <h1 ref={headerRef} >{name}</h1>
          <span ref={jobRef}> {title}</span>
          <div ref={btnRef} className={styles.introBtn}>
            <Btn btnClassName='introBtn'/>
          </div>
        </div>
        <div ref={sectionRef} className={styles.bannerGallery}>
            {images.map((item, index) => {
                return (
                
                <div key={index} className={styles.bannerGalleryWrapper} ref={addToRefs}>
                    <Link to={`projects/${item.node.slug.current}`} className={styles.bannerGalleryItem}>
                        <GatsbyImage className={styles.galleryImage}
                            image={getImage(item.node.socialMediaImage.asset.gatsbyImageData)}
                            alt={`${item.node.socialMediaImage.alt}`}
                        />
                    </Link>
                </div>
                
                )
            })}
         </div>


      </div>
       
  )
}

export default HomeSingleBanner