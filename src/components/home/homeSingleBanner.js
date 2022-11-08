import React from "react";
import * as styles from "./homeSingleBanner.module.scss";
import { useEffect, useRef } from 'react';
import Btn from "../globalComponents/btn";

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

      let ctx = gsap.context(() => {
        // create as many GSAP animations and/or ScrollTriggers here as you want...

  
  
         //this is component scroll triggered timeline  

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


          const bannerAnimation = gsap.matchMedia()
          bannerAnimation.add()


          
          bannerAnimation.add("(min-width: 1025px)", () => {

            const tl2 = gsap.timeline({
              scrollTrigger: {
                trigger: introRef.current,
                start: "bottom bottom",
                end: "bottom -100%",
                scrub: 1,
                pin: true,
                pinSpacing: true,
                toggleActions: 'play none none reverse',
                refreshPriority: 1,
              }
            });
              tl2.to(btnRef.current, {
                duration: 8,
                ease: "circe.inOut",
                css: {
                  rotation: 360*2,
              }},'-=4')
              tl2.to(btnRef.current, {
                  duration: 2,
                  ease: "circe.inOut",
                  css: {
                    autoAlpha: 0,
              }},'-=3')
              tl2.to(jobRef.current, {
                duration:1, 
                ease: "power2.out",
                css: {
                  autoAlpha: 0, 
                  yPercent:'20',
                }
              },'-=4');
              tl2.to(headerRef.current, {
                duration:3, 
                ease: "power2.out",
                css: {
                  autoAlpha: 0, 
                  yPercent:'-100',
                }
              },'-=4');
              tl2.to(sectionRef.current, {
                duration:4, 
                ease: "power2.out",
                css: {
                  xPercent: '100', 
                  yPercent:'40',
                  scale:5.2,
                }
              },'+=4');
      
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
                        start: 'top top',
                        //end:'top 30%',
                        //toggleActions: "restart pause resume none",
                        toggleActions: 'play none none reverse',
                        refreshPriority: 1,
                        pin: false,
                        pinSpacing: false,
                        scrub:3,
                    }
                });
        
            });
    
      
          })

          bannerAnimation.add("(max-width: 1024px)", () => {

            const tl2 = gsap.timeline({
              scrollTrigger: {
                trigger: introRef.current,
                start: "bottom bottom",
                end: "bottom -100%",
                scrub: 1,
                pin: true,
                pinSpacing: true,
                toggleActions: 'play none none reverse',
                refreshPriority: 1,
              }
            });
              tl2.to(btnRef.current, {
                duration: 8,
                ease: "circe.inOut",
                css: {
                  rotation: 360*2,
              }},'-=4')
              tl2.to(btnRef.current, {
                  duration: 2,
                  ease: "circe.inOut",
                  css: {
                    autoAlpha: 0,
              }},'-=3')
              tl2.to(sectionRef.current, {
                duration:6, 
                ease: "power2.out",
                css: {
                  scale:10,
                  yPercent:'130',
                  xPercent:'130',
                   }
              },'+=4');
              tl2.to(sectionRef.current, {
                duration:1, 
                ease: "power2.out",
                css: {
                  autoAlpha:0,
                  opacity:0,
                   }
              },'-=3');


              revealRefs.current.forEach((el, index) => {
        
                gsap.fromTo(el, {
                    yPercent:-20,
                    xPercent:10,
                    scale:.8,
                    autoAlpha:0,
                }, {
                    duration: 2,
                    xPercent:0,
                    yPercent:20,
                    opacity:1,
                    autoAlpha:1,
                    scale:1.4,
                    ease: "power4.out",
                    delay:6,
                    scrollTrigger: {
                        id: `section-${index+1}`,
                        trigger: el,
                        start: 'top top',
                        toggleActions: 'play none none reverse',
                        refreshPriority: 1,
                        pin: false,
                        pinSpacing: false,
                        scrub:3,
                    }
                });
        
            });


                
      
          })

          bannerAnimation.add("(max-width: 568px)", () => {

            const tl2 = gsap.timeline({
              scrollTrigger: {
                trigger: introRef.current,
                start: "bottom bottom",
                end: "bottom -100%",
                scrub: 1,
                pin: true,
                pinSpacing: true,
                toggleActions: 'play none none reverse',
                refreshPriority: 1,
              }
            });
              tl2.to(btnRef.current, {
                duration: 8,
                ease: "circe.inOut",
                css: {
                  rotation: 360*2,
              }})
              tl2.to(sectionRef.current, {
                duration:6, 
                ease: "power2.out",
                css: {
                  scale:18,
                  yPercent:'180',
                  xPercent:'200',
                   }
              },'+=4');
              tl2.to(sectionRef.current, {
                duration:1, 
                ease: "power2.out",
                css: {
                  autoAlpha:0,
                  opacity:0,
                   }
              },'-=3')



              revealRefs.current.forEach((el, index) => {
        
                gsap.fromTo(el, {
                    yPercent:-20,
                    xPercent:10,
                    scale:.8,
                    autoAlpha:0,
                }, {
                    duration: 2,
                    xPercent:0,
                    yPercent:20,
                    opacity:1,
                    autoAlpha:1,
                    scale:1.4,
                    ease: "power4.out",
                    delay:6,
                    scrollTrigger: {
                        id: `section-${index+1}`,
                        trigger: el,
                        start: 'top top',
                        toggleActions: 'play none none reverse',
                        refreshPriority: 1,
                        pin: false,
                        pinSpacing: false,
                        scrub:3,
                    }
                });
        
            });


                
      
          })
          
          

  
  
        
   
      }, introRef); // <- scopes all selector text inside the context to this component (optional, default is document)
      
      return () => ctx.revert(); // cleanup! 

    // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
    // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
    
  }, []);


  
  return (
      <header ref={introRef} className={`${styles.intro} intro`}>
        <div ref={introContentRef} className={styles.introContent}>
          <h1 className="text-color" ref={headerRef}>{name}</h1>
          <span ref={jobRef}> {title}</span>
          <div ref={btnRef} className={`${styles.introBtn} animated-btn`}>
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


      </header>
       
  )
}

export default HomeSingleBanner