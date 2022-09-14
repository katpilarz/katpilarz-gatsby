import React from "react";
import * as styles from "./galleryArchives.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image"



const GalleryArchives = ({ images }) => {
 
  return (
    <section className={styles.archiveGallery}>
        {images.map((image, index) => {
            console.log({image})
            return (
            <div className={styles.galleryImage} key={index}>
                 <GatsbyImage 
                image={getImage(image.asset.gatsbyImageData)}
                alt={image.alt}/>
            </div>
            )
        })}

    </section>
  )
}

export default GalleryArchives 