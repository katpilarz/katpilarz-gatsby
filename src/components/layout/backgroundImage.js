import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from "./backgroundImage.module.scss";




const BackgroundImage = ({ backgroundImageData }) => {

  
  return (
        <figure className={styles.backgroundImageContainer}>
            <GatsbyImage 
                image={getImage(backgroundImageData.asset.gatsbyImageData)}
                alt={`${backgroundImageData.alt}`}
            />
        </figure>
  )
}

export default BackgroundImage;