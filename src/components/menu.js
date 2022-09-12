import React from "react";
import links from "../data/links"
import socialMediaLinks from "../data/socialLinks"
import { Link } from "gatsby"
import * as styles from "./menu.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image"



const Menu = ({ isOpen,toggleSidebar, menuData }) => {

  

  return (
    <div className={isOpen ? `${styles.menuOpen} menu-background` : styles.menu}>
        <div className={isOpen ? styles.menuLinks : null}>
            {menuData.menuLinks.map((link, index)  => {
                return (
                <div className={`${styles.menuSingleLink} menu-link`} key={index}>
                    <Link to={link.url} onClick={toggleSidebar}>
                    {link.text}
                    </Link>
                    <div className={`${styles.linkImage} ${styles.linkImageLeft} `}>
                        <GatsbyImage 
                        image={getImage(link.image.asset.gatsbyImageData)}
                        alt={link.image.alt}/>
                    </div>
                    <div className={`${styles.linkImage} ${styles.linkImageRight} `}>
                        <GatsbyImage 
                        image={getImage(link.image.asset.gatsbyImageData)}
                        alt={link.image.alt}/>
                    </div>
                </div>
                )
            })}
            <div className={`${styles.menuImageDefault} ${styles.linkImageLeft} `}>
                <GatsbyImage 
                image={getImage(menuData.defaultImage.asset.gatsbyImageData)}
                alt={menuData.defaultImage.alt}/>
            </div>
            <div className={`${styles.menuImageDefault} ${styles.linkImageRight} `}>
                <GatsbyImage 
                image={getImage(menuData.defaultImage.asset.gatsbyImageData)}
                alt={menuData.defaultImage.alt}/>
            </div>
            <div className={styles.socialMediaLinks}>
                {menuData.socialLinks.map( (link, index) => {
                    return (
                    <div className={styles.socialMediaLink} key={index}>
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