import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from "./sectionAbout.module.scss";
import ScrippedText from "../components/scrippedText";
import PortableText from "react-portable-text"




const SectionAbout = ({ section }) => {
   
  return (
        <section className={styles.sectionAbout}>
            <div className={styles.sectionHeader}>
                <p className="text-uppercase">{section.subheader}</p>
                <h3>{section.header}</h3>
            </div>
            <ScrippedText scrippedTextClass="scrippedTextAbout" sectionName="about"/>
            <GatsbyImage className={styles.aboutImageOne}
                image={getImage(section.imageOne.asset.gatsbyImageData)}
                alt={`${section.imageOne.alt}`}/>
            <GatsbyImage className={styles.aboutImageTwo}
                image={getImage(section.imageTwo.asset.gatsbyImageData)}
                alt={`${section.imageTwo.alt}`}/>
            <PortableText className={styles.aboutDescription}
                content={section._rawDescription}
                projectId={process.env.GATSBY_SANITY_PROJECT_ID}
                dataset={process.env.GATSBY_SANITY_DATASET}
            />
            
            
        </section>
  )
}

export default SectionAbout;