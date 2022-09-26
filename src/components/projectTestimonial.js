import React from "react"
import * as styles from "./sectionTestimonial.module.scss";
import SectionIntro from "../components/sectionIntro";
import PortableText from "react-portable-text"




const ProjectTestimonial = ({ testimonial, name }) => {
  
  return (
        <section className={styles.sectionTestimonial}>
            <SectionIntro subheader={`This is how ${name} evaluated my work`}/>
            <div className={styles.testimonialWrapper}>
                <div className={styles.testimonialText}>
                    <svg className={`${styles.quoteIcon} ${styles.quoteIconProject}`}  width="179" height="175" viewBox="0 0 179 175" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.07" d="M167.067 175C144.194 141.193 133.256 99.4318 139.222 99.4318C161.1 99.4318 179 77.5568 179 49.7159C179 21.875 161.1 0 139.222 0C116.35 0 99.4445 20.8807 99.4445 52.6989C99.4445 87.5 114.361 136.222 167.067 175ZM0 52.6989C0 87.5 14.9167 136.222 67.6222 175C44.75 141.193 33.8111 99.4318 39.7778 99.4318C61.6556 99.4318 79.5556 77.5568 79.5556 49.7159C79.5556 21.875 61.6556 0 39.7778 0C16.9056 0 0 20.8807 0 52.6989Z" fill="#3E7DA6"/>
                    </svg>
                    <PortableText className={`${styles.testimonialTextPortable} testimonial`}
                        content={testimonial}
                        projectId={process.env.GATSBY_SANITY_PROJECT_ID}
                        dataset={process.env.GATSBY_SANITY_DATASET}
                    />
                </div>
            </div>    
        </section>
  )
}

export default ProjectTestimonial;