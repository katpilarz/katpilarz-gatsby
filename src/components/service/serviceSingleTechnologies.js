import * as React from "react"
import * as styles from "./serviceSingleTechnologies.module.scss";




const ServiceSingleTechnologies = ({ technologies }) => {

  
  return (
        <div className='container'>
            <p className="text-uppercase">Technologies I use</p>
            <div className={`${styles.technologies}`}>
                {technologies.map((item, index) => {
                    return(
                    <div className={styles.itemWrapper} key={index}>
                        <h5>{item.text}</h5>
                    </div> 
                    )
                })}
            </div>
        </div>
  );
};

export default ServiceSingleTechnologies;