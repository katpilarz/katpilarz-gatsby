import React from "react";
import * as styles from "./homeSingleFeatured.module.scss";
import { Link } from "gatsby"
import GalleryHeader from "../globalComponents/galleryHeader";
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


          
      animation.add("(min-width:  1280px)", () => {

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
              xPercent:'50',
            }
          });




          revealRefs.current.forEach((el, index) => {

            gsap.fromTo(el, {
                xPercent:50,
                scale:2,

            }, {
                duration: 2,
                xPercent:0,
                autoAlpha:1,
                scale:1,
                ease: "power4.out",
                stagger:4,
                delay:4,
                scrollTrigger: {
                    id: `section-${index+1}`,
                    trigger: el,
                    start: 'top 65%',
                    end:'top 30%',
                  
                    toggleActions: "restart pause resume none",
                    refreshPriority: 1,
                    pin: false,
                    pinSpacing: false,
                    scrub:4,
                }
            });
    
        });



      })


      animation.add("(max-width:  1279px)", () => {


          revealRefs.current.forEach((el, index) => {

            gsap.fromTo(el, {
                xPercent:20,
                scale1:1,
                autoAlpha:0,

            }, {
                duration: 2,
                xPercent:0,
                autoAlpha:1,
                scale:1,
                ease: "power4.out",
                stagger:4,
                delay:4,
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
            });
    
        });



      })


      




      
 
    }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);

  return (

      <div ref={sectionRef} className={`${styles.sectionFeatured} container`}>
          <GalleryHeader header='Latest Projects' linkText="See All Projects" linkUrl="/projects"/>
          <div ref={containerRef} className={styles.sectionFeaturedWrapper}>
            {featuredProjects.map((project, index) => {
                  return (
                    <div key={index} className={styles.projectSwiperSlide} ref={addToRefs}>
                      <Link to={`/projects/${project.node.slug.current}`} className={styles.projectSwiperSlideContainer}>
                          <div className={styles.projectSwiperSlideImage}>
                              <AnimatedImage imagePath={project.node.bannerImage.asset.gatsbyImageData} imageAlt={project.node.bannerImage.alt}/> 
                              <GatsbyImage className={styles.projectSwiperSlideImageHover}
                                image={getImage(project.node.socialMediaImage.asset.gatsbyImageData)}
                                alt={`${project.node.socialMediaImage.alt}`}
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