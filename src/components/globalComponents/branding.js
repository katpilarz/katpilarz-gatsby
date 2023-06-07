import React from "react";
import * as styles from "./branding.module.scss";
import { Link } from "gatsby"




const Branding = ({author}) => {


  return (
    <div className={`${styles.branding} link`}>
        <Link to='/'> {author} </Link>
    </div>
  )
}

export default Branding
