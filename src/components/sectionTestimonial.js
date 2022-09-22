import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from "./sectionTestimonial.module.scss";
import SectionIntro from "../components/sectionIntro";




const SectionTestimonial = ({ section }) => {

  
  return (
        <section>
            <SectionIntro subheader='blalala'/>
            <div className='add-class'>
                <h3>Testimonials</h3>
            </div>
            
        </section>
  )
}

export default SectionTestimonial;