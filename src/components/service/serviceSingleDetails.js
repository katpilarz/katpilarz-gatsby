import * as React from "react"
import * as styles from "./serviceSingleDetails.module.scss";
import SectionIntro from "../globalSections/sectionIntro";
import SectionDetails from "../globalSections/sectionDetails";



const ServiceSingleDetails = ({ section }) => {

   
  return (

    <section className={styles.sectionDetails}>
        
        <SectionIntro subheader={ section.subheader}/>
          <h3>{section.header}</h3>
        <SectionDetails text={section._rawDescription} imageOne={section.imageOne} imageTwo={section.imageTwo} video={section.video}/>

    
    </section>
      
  );
};

export default ServiceSingleDetails;