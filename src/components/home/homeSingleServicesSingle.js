import React from "react"
import * as styles from "./homeSingleServices.module.scss";
import Icon from "../global/icon";



const SectionServicesSingle = ({ title }) => {

  
  return (
    <div className={styles.serviceSingle}>
        <h4>{title}</h4>
        <Icon iconClass="sectionServiceIcon"/>
    </div>
  )
}

export default SectionServicesSingle;