import React from "react";
import * as styles from "./projectDetails.module.scss";
import PortableText from "react-portable-text"



const ProjectDetails = ({ project }) => {

  return (
    <section className={styles.projectDetails}>

        <div className={styles.projectDetailsLeft}>
            <div className={styles.projectDetailsHeader}>
                <p>PROJECT DETAILS</p>
                <h3 className="project-header">{project.header}</h3>
            </div>
            { project.isDevelopment &&
                <a href={project.url} aria-label={`${project.title} development link view`} rel="noopener noreferrer" target="_blank">
                    VIEW LIVE DEMO
                </a>
            }
        </div>
        <div className={styles.projectDetailsRight}>
            <PortableText className={styles.projectDescription}
                content={project._rawDetails}
                projectId={process.env.GATSBY_SANITY_PROJECT_ID}
                dataset={process.env.GATSBY_SANITY_DATASET}
            />
            <div className={styles.projectDetailsOverview}>
                <div className={styles.projectOverviewCard}>
                    <p>SCOPE</p>
                    <span>{project.scope}</span>
                </div>
                <div className={styles.projectOverviewCard}>
                    <p>CLIENT</p>
                    <span>{project.title}</span>
                </div>
                <div className={styles.projectOverviewCard}>
                    <p>TOOLS</p>
                    <div className={styles.toolsList}>
                        {project.tools.map((tool, index) => {
                            return(
                            <div className={styles.toolSingle} key={index}>
                                <span>{tool}</span>
                            </div> 
                            )
                        })}
                    </div> 
                </div>
                

                
            </div>
            
        </div>

    </section>
  )
}

export default ProjectDetails