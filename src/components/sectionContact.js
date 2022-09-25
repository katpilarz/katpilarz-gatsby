import React from "react";
import * as styles from "./sectionContact.module.scss";
import ReactTypingEffect from 'react-typing-effect';
import { Link } from "gatsby"
import ArrowIcon from "../components/arrow";
import ScrippedText from "../components/scrippedText";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const sectionContact = ({section }) => {

  return (
    
    <section className={styles.contact}>
        <div className={styles.contactSection}>
            <div className={styles.contactSectionContent}>
                <div className={styles.headerOne}>
                    <h3 className="header-section">{section.headerOne}</h3>
                </div>
                
                <div className={styles.headerTwo}>
                    <ReactTypingEffect
                        text={section.projectFeatures}
                        speed={150}
                        eraseDelay={1200}
                        eraseSpeed={150}
                        cursorRenderer={cursor => <h2 className="header-features">{cursor}</h2>}
                        displayTextRenderer={(text, i) => {
                        return (
                            <h2 className={"header-features"}>
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
                    <h3 className="header-section">{section.headerTwo}</h3>
                </div>
                <div className={styles.paragraph}>
                    <p>{section.subheader}</p>
                </div>
                
            </div> 
            <ScrippedText scrippedTextClass="scrippedTextContact" sectionName="contact"/>
            <div className={styles.linksWrapper}>
                    <a className={styles.contactLink} href={section.brief.asset.url} aria-label={section.brief.text} rel="noopener noreferrer" target="_blank">
                        {section.brief.text}
                        <ArrowIcon arrowIconClass="linkIcon"/>
                    </a>
                    <Link className={styles.contactLink} to='#'onClick={(e) => {
                        window.location.href = 'mailto:katgolek@pm.me?subject=Project Inquiry&body=Hello Kate, Pls see below my project details:';
                        e.preventDefault();
                        }}>
                        Send me an email
                        <ArrowIcon arrowIconClass="linkIcon"/>
                    </Link>
                    {section.contactLinks.map( (link, index) => {
                        return (
                        <Link className={styles.contactLink} to={link.url} key={index}>
                            {link.text}
                            <ArrowIcon arrowIconClass="linkIcon"/>
                        </Link>
                        )
                    })}
            </div>
        </div>
        <div className={styles.contactSectionImage}>
            <GatsbyImage
                image={getImage(section.image.asset.gatsbyImageData)}
                alt={`${section.image.alt}`}/>
        </div>
      
    </section>
  )
}

export default sectionContact