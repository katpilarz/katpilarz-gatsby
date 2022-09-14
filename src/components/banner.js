import React from "react";
import * as styles from "./banner.module.scss";
import Btn from "../components/btn";
import { GatsbyImage, getImage } from "gatsby-plugin-image"


const Banner = ({ name, banner }) => {

  return (
    <section className={styles.banner}>
      <div className={styles.bannerContent}>
        <h1>{name}</h1>
        <h3 className={styles.bannerHeader}>{banner.header}</h3>
        <Btn/>
      </div>  
      <div className={styles.galleryBanner}>
        {banner.mockups.map((image, index) => {
            return (
            <div key={index} className={`image0${index + 1} ${styles.gallerySmallImage}`}>
                <GatsbyImage 
                  image={getImage(image.asset.gatsbyImageData)}
                  alt={image.alt}
                />
            </div>
          )
        })}
      </div> 
    </section>
    
  )
}

export default Banner