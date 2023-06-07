import React from "react"
import * as styles from "./serviceSingleFAQs.module.scss";
import FAQList from "../globalSections/FAQList";
import AnimatedHeading from "../globalComponents/animatedHeading";







const ServiceSingleFAQs = ({ faqs }) => {

   
  return (

    <div className={`${styles.sectionFAQ} container`}>
        <AnimatedHeading headerOne='The most frequent' headerTwo='questions' linkText="See All Questions" linkUrl="/faqs"/>
        <FAQList faqs={faqs} faqCustomClass='faqSection'/>
    </div>
      
  );
};

export default ServiceSingleFAQs;