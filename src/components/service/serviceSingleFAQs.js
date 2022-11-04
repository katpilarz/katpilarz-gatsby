import React from "react"
import * as styles from "./serviceSingleFAQs.module.scss";
import FAQList from "../globalSections/FAQList";
import GalleryHeader from "../globalComponents/galleryHeader";







const ServiceSingleFAQs = ({ faqs }) => {

   
  return (

    <div className={`${styles.sectionFAQ} container`}>
        <GalleryHeader header='The most frequent questions' linkText="See All Questions" linkUrl="/faqs"/>
        <FAQList faqs={faqs} faqCustomClass='faqSection'/>
    </div>
      
  );
};

export default ServiceSingleFAQs;