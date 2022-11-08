import React from "react"
import * as styles from "./homeSingleServices.module.scss";
import Icon from "../globalComponents/icon";



const SectionServicesSingle = ({ title }) => {

  
  return (
    <div className={styles.serviceSingle}>
        <h4 className="text-color">{title}</h4>
        <Icon iconClass="sectionServiceIcon"/>
    </div>
  )
}

export default SectionServicesSingle;