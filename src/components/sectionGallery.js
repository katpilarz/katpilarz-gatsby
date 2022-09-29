import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from "./sectionGallery.module.scss";
import Video from "../components/video";





const SectionGallery = ({ section }) => {
   console.log({section})
  return (
        <section className={styles.sectionGallery}>
            <div className={styles.sectionGalleryWrapper}>
                <GatsbyImage className={styles.projectMockup}
                    image={getImage(section.projectMockupOne.asset.gatsbyImageData)}
                    alt={`${section.projectMockupOne.alt}`}/>
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

export default SectionGallery;