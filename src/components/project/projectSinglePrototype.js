import React from "react";
import * as styles from "./projectSinglePrototype.module.scss";
import Video from "../global/video";



const ProjectSinglePrototype = ({ prototypes }) => {
  return (
    <section className={styles.projectPrototypes}>
        {prototypes.map((prototype, index) => {
            return (
                <Video key={index} video={prototype} videoCustomClass='prototypeWrapper' isDecriptionDisplayed='true'/> 
            )
        })}
    </section>
  )
}

export default ProjectSinglePrototype