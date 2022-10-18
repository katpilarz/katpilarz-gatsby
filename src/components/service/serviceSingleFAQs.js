import React from "react"
import * as styles from "./serviceSingleFAQs.module.scss";
import ServiceSingleFAQsItem from "./serviceSingleFAQsItem";
import { Link } from "gatsby"
import ArrowIcon from "../globalComponents/arrow";






const ServiceSingleFAQs = ({ faqs }) => {

   
  return (

    <div className={`${styles.sectionFAQ} container`}>
        <div className={styles.sectionHeader}>
            <h3>The Most Frequent Questions</h3>
        </div>
        <div className={styles.faqWrapper}>
            {faqs.map((item) => {
                return (
                    <ServiceSingleFAQsItem key={item.node.id} item={item.node}/>
                );
            })}

        </div>
        <Link to='faqs'>
            See All Questions
            <ArrowIcon arrowIconClass="linkIcon"/>
        </Link>

        
    </div>
      
  );
};

export default ServiceSingleFAQs;