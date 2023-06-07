import React from "react"
import * as styles from "./marqueText.module.scss";
import Icon from "../globalComponents/icon";



const MarqueText = ({ title }) => {

  
  return (
    <div className={styles.serviceSingle}>
        <h4 className="text-color marque-text">{title}</h4>
        <Icon iconClass="sectionServiceIcon"/>
    </div>
  )
}

export default MarqueText;