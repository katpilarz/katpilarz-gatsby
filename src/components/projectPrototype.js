import React from "react";
import * as styles from "./projectPrototype.module.scss";



const ProjectPrototype = ({ prototypes }) => {
 console.log({ prototypes })
  return (
    <section className={styles.projectPrototypes}>
        {prototypes.map((prototype, index) => {
            return (
                <figure  className={styles.prototypeWrapper} key={index}>
                    <video className={styles.video}
                        title=''
                        loop muted autoPlay playsInline>
                        {/*<source src={webmAsset.url} type={`video/${webmAsset.extension}`} />*/}
                        <source src={prototype.fallback.asset.url} type={`video/${prototype.fallback.asset.extension}`} />
                    </video>
                    <figcaption>{prototype.alt}</figcaption>
                </figure>
            )
        })}
    </section>
  )
}

export default ProjectPrototype