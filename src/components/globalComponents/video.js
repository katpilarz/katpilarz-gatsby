import React from "react";
import * as styles from "./video.module.scss";



const Video = ({ videoWebm, videoFallback, videoAlt, videoCustomClass, isDecriptionDisplayed, videoCloudinary}) => {

  
  return (
    <figure className={`${styles.videoContainer} ${styles[videoCustomClass]}`}>
        <video className={styles.video} 
            title={videoAlt ? `${videoAlt}` : null}
            loop muted autoPlay playsInline>
              { videoWebm &&
                <source src={videoWebm.asset.url} type={`video/${videoWebm.asset.extension}`} />
              }
              {  videoFallback &&
                <source src={videoFallback.asset.url} type={`video/${videoFallback.asset.extension}`} />
              }
              {  videoCloudinary &&
                <source src={videoCloudinary.secure_url} type={`video/${videoCloudinary.format}`} />
              }
           
        </video>
        { isDecriptionDisplayed ==='true' &&
            <figcaption>{videoAlt}</figcaption>
        }
    </figure>
  )
}

export default Video