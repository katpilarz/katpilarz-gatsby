import React from "react"
import * as styles from "./sectionAboutDetails.module.scss";
import AnimatedImage from "../globalComponents/animatedImage";
import Video from "../globalComponents/video";
import Description from "../globalComponents/description";



const SectionAboutDetails = ({ text, imageOne, imageTwo, video }) => {


  
  return (
            
    <div className={`${styles.sectionContentWrapper} container`}>   
        <div className={styles.aboutImageMain}>
                <AnimatedImage imagePath={imageOne.asset.gatsbyImageData} imageAlt={imageOne.alt}/>   
        </div>
        <div className={styles.mediaDescriptionWrapper}>
            {imageTwo &&
                <div className={styles.aboutMedia}>
                    <AnimatedImage imagePath={imageTwo.asset.gatsbyImageData} imageAlt={imageTwo.alt}/>   
                </div>
            }
            {video &&
                <div className={styles.aboutMedia}>
                    <Video videoWebm={video.webm} videoFallback={video.fallback} videoAlt={video.alt} videoCustomClass='projectPrototype' isDecriptionDisplayed='false'/>  
                </div>
            }
            <Description description={text} descriptionCustomClass="aboutDescription"/>
        </div>
        
    </div>
            
  )
}

export default SectionAboutDetails;