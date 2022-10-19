import React from "react"
import * as styles from "./FAQList.module.scss";
import FAQListItem from "./FAQListItem";



const FAQList = ({ faqs, faqCustomClass }) => {

   
  return (

        <div className={`${styles.faqWrapper} ${styles[faqCustomClass]}`}>
            {faqs.map((item, index) => {
                return (
                    <FAQListItem key={index} item={item.node}/>
                );
            })}
        </div>
      
  );
};

export default FAQList;