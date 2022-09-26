import React from "react";
import * as styles from "./projectNext.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { navigate } from 'gatsby';



const ProjectNext = ({ nextProject }) => {

   console.log({ nextProject }) 
  return (
    <button className={styles.nextProjectSection} onClick={(e) => {
        e.preventDefault();
        navigate(`/projects/${nextProject.slug.current}`);
        // OR
      }}>
        <div className={styles.nextProjectHeader}>
                <p className="text-uppercase">Continue to Next</p>
                <h3>{nextProject.title}</h3>
        </div>
        <GatsbyImage className={styles.nextProjectImage}
            image={getImage(nextProject.bannerImage.asset.gatsbyImageData)}
            alt={`${nextProject.bannerImage.alt}`}
        />
    </button>

  )
}

export default ProjectNext