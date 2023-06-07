import React from "react"
import * as styles from "./sectionAboutDetails.module.scss";
import Video from "../globalComponents/video";
import Description from "../globalComponents/description";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);




const SectionAboutDetails = ({ text, imageOne, imageTwo, video }) => {

    const sectionRef = useRef(null);
    const mediaOneRef = useRef(null);
    const mediaTwoRef = useRef(null);

 


    useEffect(() => {
   
        // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
        // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
        let ctx = gsap.context(() => {



                    gsap.fromTo(mediaOneRef.current, {
                        xPercent:'-20',
                        yPercent:'20',
                        scale:1.27,
                        autoAlpha:0,
                    }, {
                        duration: 2,
                        autoAlpha:1,
                        xPercent:0,
                        scale:1,
                        yPercent:0,
                        ease: "power2.out",
                        scrollTrigger: {
                            id: mediaOneRef.current,
                            trigger: mediaOneRef.current,
                            start: 'top 97%',
                            end: 'top 37%',
                            toggleActions: "restart pause resume none",
                            refreshPriority: 1,
                            scrub:2,
                        }
                    });
                    gsap.fromTo(mediaTwoRef.current, {
                        xPercent:'20',
                        yPercent:'40',

                        //autoAlpha:0,
                        scale:1.27,
                    }, {
                        duration: 2,
                        autoAlpha:1,
                        xPercent:0,
                        scale:1,
                        yPercent:0,

                        ease: "power2.out",
                        scrollTrigger: {
                            id: mediaTwoRef.current,
                            trigger: mediaTwoRef.current,
                            start: 'top 97%',
                            end: 'top 37%',
                            toggleActions: "restart pause resume none",
                            refreshPriority: 1,
                            scrub:2,
                        }
                    });




  
      
        }, sectionRef); // <- scopes all selector text inside the context to this component (optional, default is document)
        
        return () => ctx.revert(); // cleanup! 
      }, []);

  
  return (
            
    <div ref={sectionRef} className={`${styles.sectionContentWrapper} container`}>   
        <div ref={mediaOneRef} className={styles.aboutImageMain}>
                <GatsbyImage class={styles.image}
                            image={getImage(imageOne.asset.gatsbyImageData)}
                alt={imageOne.alt}/>  
        </div>
        <div className={styles.mediaDescriptionWrapper}>
            <div ref={mediaTwoRef}  className={styles.aboutMedia}>

                {imageTwo &&
                    <GatsbyImage class={styles.image}
                            image={getImage(imageTwo.asset.gatsbyImageData)}
                    alt={imageTwo.alt}/> 
                }
                {video &&
                        <Video videoWebm={video.webm} videoFallback={video.fallback} videoCloudinary={video.cloudinaryVideo} videoAlt={video.alt} videoCustomClass='projectPrototype' isDecriptionDisplayed='false'/>  
                }
            </div>

            <Description description={text} descriptionCustomClass="aboutDescription"/>
        </div>
        
    </div>
            
  )
}

export default SectionAboutDetails;