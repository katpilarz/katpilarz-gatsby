import React from "react";
import * as styles from "./banner.module.scss";
//import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import AnimatedImage from "../globalComponents/animatedImage";
import Video from "../globalComponents/video";
import Media from 'react-media';




const Banner = ({ title, image, video, services, overview, publishedAt }) => {


    const pageSingleRef = useRef(null);



    useEffect(() => {
   
        // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
        // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
        


            let ctx = gsap.context(() => {
                // create as many GSAP animations and/or ScrollTriggers here as you want...
                const tl = gsap.timeline();
          
                  tl.from(pageSingleRef.current, {
                      duration: 2, 
                      ease:'power2.out',
                      css: {
                          yPercent:'50',
                      }}
                  )
            
              }, pageSingleRef); // <- scopes all selector text inside the context to this component (optional, default is document)
              
              return () => ctx.revert(); // cleanup! 
        
        
      }, []);
    

  return (
    <header ref={pageSingleRef} className={`${styles.projectBanner} container`}>
        <div className={styles.projectBannerHeader}>
            <h2 className="text-color">{title}</h2>

            <div className={styles.projectBannerDetails}>
                <p>{publishedAt}</p>
                { services &&
                    <Media query="(min-width: 569px)" render={() =>
                    (
                        <>
                            <div className={styles.servicesList}>
                                {services.map((service, index) => {
                                    return(
                                    <div className={styles.serviceSingle} key={index}>
                                        <p>{service.title}</p> 
                                    </div> 
                                    )
                                })}
                            </div> 
                            <p>{overview}</p> 
                        </>
                    
                    )}
                    />
                }
            </div>
        </div>
        { image &&
            <div className={styles.projectImageContainer}>
                <AnimatedImage imagePath={image.asset.gatsbyImageData} imageAlt={image.alt}/>   
            </div>
        }

        { video &&
            <div className={styles.projectImageContainer}>
                <Video videoWebm={video.webm} videoFallback={video.fallback}  videoAlt={video.alt} videoCloudinary={video.cloudinaryVideo} videoCustomClass='serviceMedia' isDecriptionDisplayed='false'/> 
            </div>
        }


    </header>
  )
}

export default Banner