import React from "react";
//import * as styles from "./projectsFeatured.module.scss";
import { Link } from "gatsby"
import ProjectBanner from "../components/projectBanner";




const ProjectsFeatured = ({ featuredProjects }) => {

    return (
        <section>
            {featuredProjects.map((project, index) => {
                return (
                <article key={index}>
                    <Link  to={`/projects/${project.node.slug.current}`}>
                    <ProjectBanner project={project.node}/>
                    </Link>
                </article>
                )
            })}
        </section>
    )
}

export default ProjectsFeatured