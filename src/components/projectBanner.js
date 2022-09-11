import React from "react";
import * as styles from "./projectBanner.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image"



const ProjectBanner = ({ project }) => {
    console.log({ project })

  return (
    <div className={styles.projectBanner}>
        <div className={styles.projectBannerHeader}>
            <h2>{project.title}</h2>
            <div className={styles.projectBannerDetails}>
                <p>{project.publishedAt}</p>
                {project.services.map((service, index) => {
                    return(
                    <div key={service.index}>
                        <p>{service.title}</p> 
                    </div> 
                    )
                })}
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

    </div>
  )
}

export default ProjectBanner