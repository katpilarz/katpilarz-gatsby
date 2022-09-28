import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from "./sectionGallery.module.scss";




const SectionGallery = ({ section }) => {
   console.log({section})
  return (
        <section className={styles.sectionGallery}>
            <div className={styles.sectionGalleryWrapper}>
                <GatsbyImage className={styles.projectMockup}
                    image={getImage(section.projectMockupOne.asset.gatsbyImageData)}
                    alt={`${section.projectMockupOne.alt}`}/>
                <figure className={styles.projectPrototype}>
                        <video className={styles.video}
                            title=''
                            loop muted autoPlay playsInline>
                            {/*<source src={prototype.webm.asset.url} type={`video/${prototype.webm.asset.extension}`} />*/}
                            <source src={section.projectPrototypeTwo.fallback.asset.url} type={`video/${section.projectPrototypeTwo.fallback.asset.extension}`} />
                        </video>
                        <figcaption>{section.projectPrototypeTwo.alt}</figcaption>
                </figure> 
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