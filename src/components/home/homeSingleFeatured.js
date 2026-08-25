import React from "react";
import * as styles from "./homeSingleFeatured.module.scss";
import { Link } from "gatsby"
import AnimatedHeading from "../globalComponents/animatedHeading";
import AnimatedImage from "../globalComponents/animatedImage";
import Media from "../globalComponents/media";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Scrollbar, Mousewheel, Autoplay, FreeMode, Keyboard, Zoom} from "swiper/modules";

// Import Swiper styles
import "swiper/css";

import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect"
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



  useIsomorphicLayoutEffect(() => {
   
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

 
    }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
    
    return () => ctx.revert(); // cleanup! 
  }, []);

  return (

      <>
        <Media query="(min-width: 569px)" render={() =>
          (
            <div ref={sectionRef} className={`${styles.sectionFeatured} container`}>
                <AnimatedHeading headerOne='Creating Competitive' headerTwo='startup experience' linkText="See All Projects" linkUrl="/projects"/>
                <div ref={containerRef} className={styles.sectionFeaturedWrapper}>
                  {featuredProjects.map((project, index) => {
                        return (
                          <div key={index} className={styles.projectCard} ref={addToRefs}>
                            <Link to={`/projects/${project.node.slug.current}`} className={styles.projectCardWrapper}>
                                <div className={styles.projectCardImage}>
                                    <AnimatedImage imagePath={project.node.homeFeaturedProjectImage.asset.gatsbyImageData} imageAlt={project.node.homeFeaturedProjectImage.alt}/> 
                                    <GatsbyImage className={styles.projectCardImageHover}
                                      image={getImage(project.node.homeFeaturedProjectImageHover.asset.gatsbyImageData)}
                                      alt={`${project.node.homeFeaturedProjectImageHover.alt}`}
                                    />
                                </div>
                                <div  className={styles.projectCardHeader}>
                                    {/*<p  className="text-uppercase">{project.node.overview}</p>*/}
                                    <p>{project.node.title}</p>
                                </div>
                            </Link>
                          </div>
                      )
                    })}
              </div>
            </div>
          )}
        />
        <Media query="(max-width: 568px)" render={() =>
          ( 
            <div className={styles.sectionFeatured}>
                <div className='container'>
                  <AnimatedHeading headerOne='Creating Competitive' headerTwo='startup experience' linkText="See All Projects" linkUrl="/projects"/>
                </div>
                <Swiper className={styles.swiper} 
                    modules={[EffectFade, Navigation, Pagination,Scrollbar, Mousewheel, Autoplay, FreeMode, Keyboard, Zoom]}
                    slidesPerView={"auto"}
                    centeredSlides={false}
                    direction={"horizontal"}
                    spaceBetween={30}
                    grabCursor={true}
                    mousewheel={true}
                    keyboard={{
                        enabled: true,
                    }}
                    speed={1000}
                    effect={"slide"}
                  > 
                    {featuredProjects.map((item, index) => {
                        return (
                          <SwiperSlide key={index} className={styles.swiperSlide}>
                            <Link to={`/projects/${item.node.slug.current}`} className={styles.swiperSlideItem}>
                                <GatsbyImage className={styles.swiperImage}
                                    image={getImage(item.node.homeFeaturedProjectImageHover.asset.gatsbyImageData)}
                                    alt={`${item.node.homeFeaturedProjectImageHover.alt}`}
                                />
                                <div  className={styles.projectCardHeader}>
                                  <p>{item.node.title}</p>
                              </div>
                            </Link>
                          </SwiperSlide>
                      )
                    })}
                 </Swiper>
              </div>
          )}
        />

      </>
          
  )
}

export default HomeSingleFeatured