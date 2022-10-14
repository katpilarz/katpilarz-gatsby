import React from "react";
import * as styles from "./headerMenu.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Icon from "../globalComponents/icon";
import { Link } from "gatsby"
//import TransitionLink from 'gatsby-plugin-transition-link';
import BackgroundImage from "./backgroundImage"
import { useEffect, useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);



const HeaderMenu = ({ isOpen,toggleSidebar, menuData, backgroundImageData}) => {


    const tl = useRef();
    const navRef = useRef(null)

    const revealRefs = useRef([]);
    revealRefs.current = [];
  
  

    useEffect(() => {
   
        // create a context for all the GSAP animations and ScrollTriggers so we can revert() them in one fell swoop.
        // A context also lets us scope all the selector text to the component (like feeding selector text through component.querySelectorAll(...)) 
        let ctx = gsap.context(() => {
          // create as many GSAP animations and/or ScrollTriggers here as you want...
    
          const nav = navRef.current;
          const lists = nav.querySelectorAll('li')
          const social = nav.querySelectorAll('.social')
          gsap.set([...lists, social],{autoAlpha: 0})
          tl.current = 
            gsap.timeline()
            .to(nav,{top: 0, height:'100vh', duration: 2,ease: "power4.out",})
            .staggerFromTo(lists,.3,{xPercent: '-=10px',ease: "sine.inOut",},{xPercent: 0,autoAlpha: 1, ease: "sine.inOut",},0.27).reverse()
            .staggerFromTo(social,.3, {yPercent: '-=10px',ease: "sine.inOut",},{yPercent: 0,autoAlpha: 1, ease: "sine.inOut",},0.27, '-=.6').reverse()
          
     
        }, navRef); // <- scopes all selector text inside the context to this component (optional, default is document)
        
        return () => ctx.revert(); // cleanup! 
      }, []);
    

    useEffect(()=>{
        tl.current.reversed(!isOpen)
    },[isOpen])
    

  return (
    <div ref={navRef}  className={isOpen ? `${styles.menuOpen} menu-background` : styles.menu}>
        <BackgroundImage backgroundImageData={backgroundImageData}/>
        <ul className={isOpen ? styles.menuLinks : null}>
            {menuData.menuLinks.map((link, index)  => {
                return (
                <li  className={`${styles.menuSingleLink} menu-link`} key={index}>
                    <Link to={link.url} onClick={toggleSidebar} style={{ top: isOpen ? "0" : "120px"}}>
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
                </li>
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
                    <div className={`${styles.socialMediaLink} social`} key={index}>
                        <a href={link.url} aria-label={link.text} rel="noopener noreferrer" target="_blank">
                        {link.text}
                        </a>
                    </div>
                    )
                })}
            </div>
        </ul>
    </div>
  )
}

export default HeaderMenu