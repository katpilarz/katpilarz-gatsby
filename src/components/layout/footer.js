import React from "react"
import * as styles from "./footer.module.scss";
//import { Link } from "gatsby"




const Footer = ({ socialLinks, footerLinks }) => {

  
  return (
        <footer className={styles.footer}>
            
            {/*<div className={styles.footerLinksWrapper}>
                {socialLinks.map( (link, index) => {
                    return (
                    <div className={styles.footerLink} key={index}>
                        <a href={link.url} aria-label={link.text} rel="noopener noreferrer" target="_blank">
                            {link.text}
                        </a>
                    </div>
                    )
                })}
            </div>
            <div className={styles.footerLinksWrapper}>
                {footerLinks.map( (link, index) => {
                    return (
                    <div className={`${styles.footerLink}`} key={index}>
                        <Link to={link.url}>
                            {link.text}
                        </Link>
                    </div>
                    )
                })}
            </div>*/}
            <div className={styles.footerLinksWrapper}>
                <p className="text-uppercase">&copy;Copyright {new Date().getFullYear()}. All rights reserved. Designed & developed with love &hearts;</p>
                <p className="text-uppercase"> For the best user experience please use Brave, Chrome, Firefox or MS Edge. </p>
            </div>
            
        </footer>
  )
}

export default Footer;