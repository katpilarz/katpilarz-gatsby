import React from "react"
import * as styles from "./sectionIntro.module.scss";
import Icon from "../components/icon";




const SectionIntro = ({ subheader }) => {

  
  return (
    <div className={styles.sectionIntro}>
        <Icon iconClass="sectionIcon"/>
        <div className={styles.line}></div>
        <p className="text-uppercase">{subheader}</p>
    </div>
  )
}

export default SectionIntro;