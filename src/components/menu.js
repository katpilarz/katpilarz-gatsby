import React from "react";
import links from "../data/links"
import socialMediaLinks from "../data/socialLinks"
import { Link } from "gatsby"
//import Link from 'gatsby-plugin-transition-link'
import * as styles from "./menu.module.scss";



const Menu = ({ isOpen,toggleSidebar }) => {

  

  return (
    <div className={isOpen ? `${styles.menuOpen} menu-background` : styles.menu}>
        <div className={isOpen ? styles.menuLinks : null}>
            {links.map(link => {
                return (
                <div className={`${styles.menuSingleLink} menu-link`} key={link.id}>
                    <Link to={link.url} onClick={toggleSidebar}>
                    {link.text}
                    </Link>
                    <div className={`${styles.linkImage} ${styles.linkImageLeft} `}>
                        <img 
                        src={link.image}
                        alt={link.text}/>
                    </div>
                    <div className={`${styles.linkImage} ${styles.linkImageRight} `}>
                        <img 
                        src={link.image}
                        alt={link.text}/>
                    </div>
                </div>
                )
            })}
            <div className={`${styles.linkImage} ${styles.menuImageDefault} ${styles.linkImageLeft} `}>
                    <img 
                    src="https://images.unsplash.com/photo-1543487945-139a97f387d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
                    alt="Some great work"/>
            </div>
            <div className={`${styles.linkImage} ${styles.menuImageDefault} ${styles.linkImageRight} `}>
                <img 
                src="https://images.unsplash.com/photo-1543487945-139a97f387d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
                alt="Some great work"/>
            </div>
            <div className={styles.socialMediaLinks}>
                {socialMediaLinks.map(link => {
                    return (
                    <div className={styles.socialMediaLink} key={link.id}>
                        <a href={link.url} aria-label={link.text} rel="noopener noreferrer" target="_blank">
                        {link.text}
                        </a>
                    </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default Menu