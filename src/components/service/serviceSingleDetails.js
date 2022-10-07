import * as React from "react"
import * as styles from "./serviceSingleDetails.module.scss";
import SectionIntro from "../../components/global/sectionIntro";
import PortableText from "react-portable-text"



const ServiceSingleDetails = ({ details }) => {


   
  return (

    <section className={styles.sectionDetails}>
        <h3>Personalised, increased user engagement</h3>
        <SectionIntro subheader={ `Helping brands create unforgettable experience`}/>
        
        <div className={styles.detailsText}>
            <PortableText className={`${styles.detailsTextPortable}`}
                content={details}
                projectId={process.env.GATSBY_SANITY_PROJECT_ID}
                dataset={process.env.GATSBY_SANITY_DATASET}
            />
        </div>
        
    
    </section>
      
  );
};

export default ServiceSingleDetails;