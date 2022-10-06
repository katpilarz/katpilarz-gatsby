import React from "react";
import * as styles from "./headerMenu.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Icon from "../../components/global/icon";
import { Link } from "gatsby"
//import TransitionLink from 'gatsby-plugin-transition-link';



const HeaderMenu = ({ isOpen,toggleSidebar, menuData }) => {

  

  return (
    <div className={isOpen ? `${styles.menuOpen} menu-background` : styles.menu}>
        <div className={isOpen ? styles.menuLinks : null}>
            {menuData.menuLinks.map((link, index)  => {
                return (
                <div className={`${styles.menuSingleLink} menu-link`} key={index}>
                    {/*<TransitionLink to={link.url} onClick={toggleSidebar}
                         entry={{
                            delay:2,
                            length: 1,
                            
                        }}>
                        <Icon iconClass="menuLinkIcon" />
                        
                        {link.text}
                        <Icon iconClass="menuLinkIcon"/>
                    </TransitionLink>*/}
                    <Link to={link.url} onClick={toggleSidebar}>
                        <Icon iconClass="menuLinkIcon" />
                        
                        {link.text}
                        <Icon iconClass="menuLinkIcon"/>
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

export default HeaderMenu