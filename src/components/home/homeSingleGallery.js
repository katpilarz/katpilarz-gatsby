import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from "./homeSingleGallery.module.scss";
import Video from "../global/video";
import AnimatedImage from "../global/animatedImage";




const HomeSingleGallery = ({ section }) => {
  return (
        <section className={`${styles.sectionGallery} container`}>
            <div className={styles.sectionGalleryWrapper}>
                <div className={styles.projectMockup}>
                    <AnimatedImage imagePath={section.projectMockupOne.asset.gatsbyImageData} imageAlt={section.projectMockupOne.alt}/>   
               </div>
                <Video video={section.projectPrototypeTwo} videoCustomClass='projectPrototype' isDecriptionDisplayed='false'/>    
            </div>
            <div className={styles.sectionGalleryWrapper}>
                <GatsbyImage className={styles.projectMockupFull}
                    image={getImage(section.projectMockupThree.asset.gatsbyImageData)}
                    alt={`${section.projectMockupThree.alt}`}/>

            </div>
        </section>
  )
}

export default HomeSingleGallery;