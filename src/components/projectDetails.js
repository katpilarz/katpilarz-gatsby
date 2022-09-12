import React from "react";
import * as styles from "./projectDetails.module.scss";



const ProjectDetails = ({ project }) => {

  return (
    <section className={`container ${styles.projectDetails}`}>

        <div className={styles.projectDetailsLeft}>
            <div className={styles.projectDetailsHeader}>
                <p>PROJECT DETAILS</p>
                <h3>{project.header}</h3>
            </div>
            { project.isDevelopment &&
                <a href={project.url} aria-label={`${project.title} development link view`} rel="noopener noreferrer" target="_blank">
                    VIEW LIVE DEMO
                </a>
            }
        </div>
        <div className={styles.projectDetailsRight}>
            <div className={styles.projectDescription}>
                <p>{project.description}</p>
            </div>
            <div className={styles.projectDetailsOverview}>
                <div className={styles.projectOverviewCard}>
                    <p>SCOPE</p>
                    <p>{project.scope}</p>
                </div>
                <div className={styles.projectOverviewCard}>
                    <p>CLIENT</p>
                    <p>{project.title}</p>
                </div>
                
            </div>
            
        </div>

    </section>
  )
}

export default ProjectDetails