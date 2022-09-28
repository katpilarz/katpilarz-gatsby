import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from "./sectionFocus.module.scss";
import SectionIntro from "../components/sectionIntro";




const SectionFocus = ({ section }) => {

  
  return (
        <section className={styles.sectionFocus}>
            <SectionIntro subheader={section.subheader}/>
            <div className={styles.focusAreasWrapper}>
                {section.focusAreas.map( (area, index) => {
                    return (
                    <div className={styles.focusArea} key={index}>
                        <h4>{area.text}</h4>
                        <div className={styles.focusAreaMedia} key={index}>
                            {area.image &&
                                <GatsbyImage 
                                    image={getImage(area.image.asset.gatsbyImageData)}
                                    alt={`${area.image.alt}`}
                                />
                            }

                            {area.video &&
                                 <figure  className={styles.focusAreaMedia} key={index}>
                                    <video className={styles.video}
                                        title=''
                                        loop muted autoPlay playsInline>
                                        <source src={area.video.webm.asset.url} type={`video/${area.video.webm.asset.extension}`} />
                                        <source src={area.video.fallback.asset.url} type={`video/${area.video.fallback.asset.extension}`} />
                                    </video>
                                </figure>
                            }
                        </div>
                    </div>
                    )
                })}
            </div>
            
        </section>
  )
}

export default SectionFocus;