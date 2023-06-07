import React from "react";
import * as styles from "./projectSinglePrototype.module.scss";
import Video from "../globalComponents/video";



const ProjectSinglePrototype = ({ prototypes }) => {
  return (
    <section className={styles.projectPrototypes}>
        {prototypes.map((prototype, index) => {
            return (
                <Video key={index} videoWebm={prototype.webm} videoFallback={prototype.fallback} videoAlt={prototype.alt} videoCustomClass='prototypeWrapper' isDecriptionDisplayed='true'/> 
            )
        })}
    </section>
  )
}

export default ProjectSinglePrototype