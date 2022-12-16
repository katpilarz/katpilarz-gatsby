import React from "react";
import * as styles from "./homeSingleFeatured.module.scss";
import { Link } from "gatsby"
import AnimatedHeading from "../globalComponents/animatedHeading";
import AnimatedImage from "../globalComponents/animatedImage";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);



const HomeSingleFeatured = ({ featuredProjects }) => {


  const sectionRef = useRef(null);

  const containerRef = useRef(null);


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
      const animation = gsap.matchMedia()
      animation.add()


          
      animation.add("(min-width:  569px)", () => {

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
            end:'top 50%',
            scrub: 1,
            pin: false,
            pinSpacing: false,
           
            toggleActions: "restart pause resume none",
            refreshPriority: 1,
          }
        })
  
        tl.from(containerRef.current, {
            duration:6, 
            ease: "power2.out",
            css: {
              xPercent:'-50',
            }
          });




          revealRefs.current.forEach((el, index) => {

            gsap.fromTo(el, {
                xPercent:50,
                scale:1.47,
                marginTop:'12vw'

            }, {
                duration: 2,
                xPercent:0,
                autoAlpha:1,
                scale:1,
                marginTop:0,
                ease: "power4.out",
                scrollTrigger: {
                    id: `section-${index+1}`,
                    trigger: el,
                    start: 'top 77%',
                    end:'top 37%',
                  
                    toggleActions: "restart pause resume none",
                    refreshPriority: 1,
                    pin: false,
                    pinSpacing: false,
                    scrub:4,
                }
            },'+=4');
    
        });



      })


      animation.add("(max-width:  568px)", () => {


          /*revealRefs.current.forEach((el, index) => {

            gsap.fromTo(el, {
                xPercent:-30,
                autoAlpha:0,

            }, {
                duration: 2,
                xPercent:0,
                autoAlpha:1,
                ease: "power4.out",
                scrollTrigger: {
                    id: `section-${index+1}`,
                    trigger: el,
                    start: 'top 77%',
                    end:'top 37%',
                  
                    toggleActions: "restart pause resume none",
                    refreshPriority: 1,
                    pin: false,
                    pinSpacing: false,
                    scrub:4,
                }
            },'+=4');
    
        });*/





          revealRefs.current.forEach((el, index) => {

            gsap.fromTo(el, {
                autoAlpha:0,
                xPercent:'-30',
                //yPercent:'-5',
                scale:1.47,
                marginTop:'20vw'

            }, {
                duration: 2,
                xPercent:0,
                yPercent:0,
                autoAlpha:1,
                scale:1,
                marginTop:0,
                ease: "power4.out",
                scrollTrigger: {
                    id: `section-${index+1}`,
                    trigger: el,
                    start: 'top 97%',
                    end:'top 57%',
                  
                    toggleActions: "restart pause resume none",
                    refreshPriority: 1,
                    pin: false,
                    pinSpacing: false,
                    scrub:4,
                }
            },'+=4');
    
        });



      })


      
     
 
    }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);

  return (

      <div ref={sectionRef} className={`${styles.sectionFeatured} container`}>
          <AnimatedHeading headerOne='Creating Competitive' headerTwo='startup experience' linkText="See All Projects" linkUrl="/projects"/>
          <div ref={containerRef} className={styles.sectionFeaturedWrapper}>
            {featuredProjects.map((project, index) => {
                  return (
                    <div key={index} className={styles.projectSwiperSlide} ref={addToRefs}>
                      <Link to={`/projects/${project.node.slug.current}`} className={styles.projectSwiperSlideContainer}>
                          <div className={styles.projectSwiperSlideImage}>
                              <AnimatedImage imagePath={project.node.homeFeaturedProjectImage.asset.gatsbyImageData} imageAlt={project.node.homeFeaturedProjectImage.alt}/> 
                              <GatsbyImage className={styles.projectSwiperSlideImageHover}
                                image={getImage(project.node.homeFeaturedProjectImageHover.asset.gatsbyImageData)}
                                alt={`${project.node.homeFeaturedProjectImageHover.alt}`}
                              />
                          </div>
                          <div  className={styles.projectSwiperSlideHeader}>
                              {/*<p  className="text-uppercase">{project.node.overview}</p>*/}
                              <p>{project.node.title}</p>
                          </div>
                      </Link>
                    </div>
                )
              })}
            </div>
        </div>  
  )
}

export default HomeSingleFeatured