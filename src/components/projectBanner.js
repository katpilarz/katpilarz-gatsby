import React from "react";
import * as styles from "./projectBanner.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image"



const ProjectBanner = ({ project }) => {

  return (
    <section className={styles.projectBanner}>
        <div className={styles.projectBannerHeader}>
            <h2 className={styles.header}>{project.title}</h2>
            <div className={styles.projectBannerDetails}>
                <p>{project.publishedAt}</p>
                <div className={styles.servicesList}>
                    {project.services.map((service, index) => {
                        return(
                        <div className={styles.serviceSingle} key={index}>
                            <p>{service.title}</p> 
                        </div> 
                        )
                    })}
                </div> 
                
                <p>{project.overview}</p>   
            </div>
            </div>
            <div className={styles.projectImageContainer}>
            <GatsbyImage
                image={getImage(project.bannerImage.asset.gatsbyImageData)}
                className="project-img"
                alt={project.bannerImage.alt}
            />
        </div>

    </section>
  )
}

export default ProjectBanner