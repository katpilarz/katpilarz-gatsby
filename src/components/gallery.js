import React from "react";
import * as styles from "./gallery.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image"



const Gallery = ({ images, galleryClassName }) => {
 
  return (
    <section className={styles[galleryClassName]}>
        {images.map((image, index) => {
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

export default Gallery