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
                        <div className={styles.focusAreaImage} key={index}>
                            <GatsbyImage 
                                image={getImage(area.image.asset.gatsbyImageData)}
                                alt={`${area.image.alt}`}
                            />
                        </div>
                    </div>
                    )
                })}
            </div>
            
        </section>
  )
}

export default SectionFocus;