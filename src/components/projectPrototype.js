import React from "react";
import * as styles from "./projectPrototype.module.scss";
import Video from "../components/video";



const ProjectPrototype = ({ prototypes }) => {
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

export default ProjectPrototype