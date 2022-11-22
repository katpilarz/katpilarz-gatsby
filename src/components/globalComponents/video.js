import React from "react";
import * as styles from "./video.module.scss";



const Video = ({ videoWebm, videoFallback, videoAlt, videoCustomClass, isDecriptionDisplayed }) => {

  
  return (
    <figure className={`${styles.videoContainer} ${styles[videoCustomClass]}`}>
        <video className={styles.video} 
            title={videoAlt ? `${videoAlt}` : null}
            loop muted autoPlay playsInline>
              <source src={videoWebm.asset.url} type={`video/${videoWebm.asset.extension}`} />
              <source src={videoFallback.asset.url} type={`video/${videoFallback.asset.extension}`} />
           
        </video>
        { isDecriptionDisplayed ==='true' &&
            <figcaption>{videoAlt}</figcaption>
        }
    </figure>
  )
}

export default Video