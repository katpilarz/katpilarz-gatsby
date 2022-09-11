import React from "react";
import * as styles from "./banner.module.scss";
import Btn from "../components/btn";


const Banner = ({ name }) => {

  return (
    <div className={styles.banner}>
        <h1>{name}</h1>
        <h3 className="banner-header">Tailoring customized web information 
    architecture for small business and start ups</h3>
    <Btn/>

      
    </div>
      
  )
}

export default Banner