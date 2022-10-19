import React from "react"
import * as styles from "./serviceSingleFAQs.module.scss";
import { Link } from "gatsby"
import ArrowIcon from "../globalComponents/arrow";
import FAQList from "../globalSections/FAQList";






const ServiceSingleFAQs = ({ faqs }) => {

   
  return (

    <div className={`${styles.sectionFAQ} container`}>
        <div className={styles.sectionHeader}>
            <h3>The Most Frequent Questions</h3>
        </div>
        <FAQList faqs={faqs} faqCustomClass='faqSection'/>
        <Link to='/faqs'>
            See All Questions
            <ArrowIcon arrowIconClass="linkIcon"/>
        </Link>
    </div>
      
  );
};

export default ServiceSingleFAQs;