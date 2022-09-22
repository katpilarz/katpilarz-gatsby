import React from "react";
import * as styles from "./sectionContact.module.scss";
import ReactTypingEffect from 'react-typing-effect';
import { Link } from "gatsby"
import ArrowIcon from "../components/arrow";

const sectionContact = () => {

  return (
    
    <section className={styles.contactSection}>
      <div className={styles.contactSectionContent}>
        <div className={styles.headerOne}>
            <h3 className="header-section">Have any</h3>
        </div>
        
        <div className={styles.headerTwo}>
     
            <ReactTypingEffect
                text={["INTERESTING", "ELEGANT", "VIBRANT", "LUXURY", "DEMANDING", "ORIGINAL"]}
                speed={150}
                eraseDelay={1200}
                eraseSpeed={150}
                cursorRenderer={cursor => <h2 className="header-features">{cursor}</h2>}
                displayTextRenderer={(text, i) => {
                return (
                    <h2 className="header-features">
                    {text.split('').map((char, i) => {
                        const key = `${i}`;
                        return (
                        <span
                            key={key}
                            style={i%2 === 0 ? { color: '#2283AC'} : {}}
                        >{char}</span>
                        );
                    })}
                    </h2>
                );
                }}        
            />
        </div>
        <div className={styles.headerThree}>
            <h3 className="header-section">project in mind...?</h3>
        </div>
        <div className={styles.paragraph}>
            <p>Helping brands create outstanding online experience</p>
        </div>
      </div> 
      <div className={styles.linksWrapper}>
            <Link to='/'>
                DROP ME AN EMAIL
                <ArrowIcon arrowIconClass="linkIcon"/>
            </Link>
            <Link to='/contact'>
                QUICK MESSAGE
                <ArrowIcon arrowIconClass="linkIcon"/>
            </Link>

      </div>
      
    </section>
  )
}

export default sectionContact