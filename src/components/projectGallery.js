import React from "react";
import * as styles from "./projectGallery.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image"



const ProjectGallery = ({ mockups }) => {
 
  return (
    <section className={styles.projectGallery}>
        {mockups.map((image, index) => {
            return (
            <div key={index}>
                 <GatsbyImage 
                image={getImage(image.asset.gatsbyImageData)}
                alt={image.alt}
            />
            </div>
             
            )
        })}

    </section>
  )
}

export default ProjectGallery