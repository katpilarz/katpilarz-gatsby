import React from "react"
import * as styles from "./homeSingleGallery.module.scss";
import Video from "../globalComponents/video";
import AnimatedImage from "../globalComponents/animatedImage";




const HomeSingleGallery = ({ gallery }) => {

 const galleryItems = gallery
 console.log({galleryItems})

   
  return (
    <section className={`${styles.sectionGallery} container`}>
        
            <div className={styles.sectionGalleryWrapper}>
            {galleryItems.map((item, index) => {
                console.log({item})
                return (
                    <div key={index} className={styles.projectMockup}>
                        {item.webm &&
                            <Video videoWebm={item.webm} videoFallback={item.fallback} videoAlt={item.alt}  isDecriptionDisplayed='false'/> 
                        }
                        {item.asset &&
                            <AnimatedImage imagePath={item.asset.gatsbyImageData} imageAlt={item.alt}/>   
                        }
                    </div>
                
                )
            })}
            </div>
    </section>

  )
}

export default HomeSingleGallery;