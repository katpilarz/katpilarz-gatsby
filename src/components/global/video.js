import React from "react";
import * as styles from "./video.module.scss";


const Video = ({ video, videoCustomClass, isDecriptionDisplayed }) => {
  return (
    <figure  className={`${styles.videoContainer} ${styles[videoCustomClass]}`}>
        <video className={styles.video}
            title={video.alt ? `${video.alt}` : null}
            loop muted autoPlay playsInline>
            <source src={video.webm.asset.url} type={`video/${video.webm.asset.extension}`} />
            <source src={video.fallback.asset.url} type={`video/${video.fallback.asset.extension}`} />
        </video>
        { isDecriptionDisplayed ==='true' &&
            <figcaption>{video.alt}</figcaption>
        }
    </figure>
  )
}

export default Video