import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from "./backgroundImage.module.scss";




export default function BackgroundImage() {
  const data = useStaticQuery(graphql`
  {
    sanityGlobal {
      image {
        asset {
          gatsbyImageData(layout: FULL_WIDTH, formats: PNG)
        }
        alt
      }
    }
  }
`)


const backgroundImageData = data.sanityGlobal.image

console.log({data})
  

  return (
        <figure className={styles.backgroundImageContainer}>
            <GatsbyImage 
                image={getImage(backgroundImageData.asset.gatsbyImageData)}
                alt={backgroundImageData.alt}
            />
        </figure>
  )
}