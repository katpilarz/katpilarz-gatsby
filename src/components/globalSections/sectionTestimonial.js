import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from "./sectionTestimonial.module.scss";
import SectionIntro from "./sectionIntro";
import PortableText from "../globalComponents/portableText"
import { Link } from "gatsby"
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);









const SectionTestimonial = ({ testimonial, pageName, name, image, services, slug, isHome, featuredVideo }) => {

    const testimonialRef = useRef(null);



    useEffect(() => {
     
      // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
      // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
      let ctx = gsap.context(() => {
        // create as many GSAP animations and/or ScrollTriggers here as you want...
        
        // FIRST TIMELINE
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: testimonialRef.current,
                start: "top 97%",
                end: "top 47%",
                scrub:2, 
                repeatRefresh: true,
                toggleActions: "restart pause resume none"

            }
            });
            tl.from(testimonialRef.current, {
                duration: 1,
                ease: "power2.out",
                css: {
                autoAlpha: 0.2,
                opacity:0,
                yPercent:'27',
                marginTop:'10vw'
            }})
      
    
      }, testimonialRef); // <- scopes all selector text inside the context to this component (optional, default is document)
      
      return () => ctx.revert(); // cleanup! 
    }, []);
  
  
  return (
        <section className={isHome ?  `${styles.sectionTestimonial} container`  : `${styles.sectionTestimonialProject} container`}>
            <SectionIntro subheader={pageName === 'home' ? `How my clients evaluated my work` : `This is how ${name} evaluated my work`}/>
            <div className={styles.testimonialWrapper} ref={testimonialRef}>
                
                <div className={isHome ? `${styles.testimonialText} ${styles.testimonialTextHome}` : `${styles.testimonialText} ${styles.testimonialTextProject}`}>
                    <svg  className={isHome ? `${styles.quoteIcon} ${styles.quoteIconLeft}` : `${styles.quoteIcon} ${styles.quoteIconProject}`} width="179" height="175" viewBox="0 0 179 175" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.07" d="M167.067 175C144.194 141.193 133.256 99.4318 139.222 99.4318C161.1 99.4318 179 77.5568 179 49.7159C179 21.875 161.1 0 139.222 0C116.35 0 99.4445 20.8807 99.4445 52.6989C99.4445 87.5 114.361 136.222 167.067 175ZM0 52.6989C0 87.5 14.9167 136.222 67.6222 175C44.75 141.193 33.8111 99.4318 39.7778 99.4318C61.6556 99.4318 79.5556 77.5568 79.5556 49.7159C79.5556 21.875 61.6556 0 39.7778 0C16.9056 0 0 20.8807 0 52.6989Z" fill="#1E6DB6"/>
                    </svg>
                         <PortableText className={`${styles.testimonialTextPortable} testimonial`}
                            content={testimonial}
                        />
                    { isHome &&
                        <svg className={`${styles.quoteIcon} ${styles.quoteIconRight}`} width="179" height="175" viewBox="0 0 179 175" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.07" d="M11.9333 175C34.8056 141.193 45.7444 99.4318 39.7778 99.4318C17.9 99.4318 0 77.5568 0 49.7159C0 21.875 17.9 0 39.7778 0C62.65 0 79.5555 20.8807 79.5555 52.6989C79.5555 87.5 64.6389 136.222 11.9333 175ZM179 52.6989C179 87.5 164.083 136.222 111.378 175C134.25 141.193 145.189 99.4318 139.222 99.4318C117.344 99.4318 99.4444 77.5568 99.4444 49.7159C99.4444 21.875 117.344 0 139.222 0C162.094 0 179 20.8807 179 52.6989Z" fill="#1E6DB6"/>
                        </svg>
                    }
                </div>

                { isHome &&
                    <Link className={styles.clientsDetails} to={`projects/${slug}`}>
                        <GatsbyImage className={styles.testimonialImage}
                        image={getImage(image.asset.gatsbyImageData)}
                        alt={`${image.alt}`}/>
                        <p>{name}</p>
                        <div className={styles.testimonialServicesList}>
                            {services.map((service, index) => {
                                return(
                                <div className={styles.serviceSingle} key={index}>
                                    <p>{service.title}</p> 
                                </div> 
                                )
                            })}
                        </div>
                    </Link>
                }
                
            </div>
            
        </section>
  )
}

export default SectionTestimonial;