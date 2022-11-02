import React, { useState } from "react"
import HeaderNavbar from "./layout/headerNavbar"
import HeaderMenu from "./layout/headerMenu"
import BackgroundImage from "./layout/backgroundImage"
import Footer from "./layout/footer"
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby"

//import { useEffect, useRef } from 'react';
//import gsap from 'gsap/dist/gsap';


import "../styles/layout.scss"



export default function Layout({ transitionStatus,children }) {
  const data = useStaticQuery(graphql`
  {
    sanityGlobal {
      image {
        asset {
          gatsbyImageData(
            layout: FULL_WIDTH
            formats: PNG
            backgroundColor: "F8F8F8"
            placeholder: NONE
          )
        }
        alt
      }
      menu {
        defaultImage {
          alt
          asset {
            gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: NONE)
            url
          }
        }
        menuLinks {
          text
          url
          image {
            alt
            asset {
              gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: NONE)
            }
          }
        }
        socialLinks {
          text
          url
        }
      }
    }
    sanitySeo(_id: {eq: "2b913895-10d9-472b-8d7a-30dd2c56e4ed"}) {
      author
      contact
    }
   }
  
`)




const [isOpen, setIsOpen] = useState(false)

const toggleSidebar = () => {
  setIsOpen(!isOpen)
}

const backgroundImageData = data.sanityGlobal.image
const name = data.sanitySeo.author
//const contact = data.sanitySeo.contact
const menuData = data.sanityGlobal.menu


/*const pageRef=useRef()

  useEffect(() => {
    
    gsap.to(pageRef.current, {
      autoAlpha: 1,
      duration: 1,
      ease: "circe.inOut"
    });
  }, []); //THIS IS RUN THE FIRST TIME THE SITE IS OPENED
  useEffect(() => {
    if (transitionStatus === 'entering') {
      gsap.to(pageRef.current, {
        duration:2, 
        ease: "power4.out",
        css: {
          autoAlpha: 1, 
          opacity:1,
          yPercent:'100',
        }})
    }
    if (transitionStatus === 'exiting') {
      gsap.to(pageRef.current, { 
        duration:2, 
        ease: "power4.out",
        css: {
          autoAlpha: 0, 
          opacity:0,
          yPercent:'-100',
        }})
        //if we are exiting  the page, let's make the div with class .hometex transparent in one second
    }
  }, [transitionStatus]);*/

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="/fonts/ScholastycaTypeface-Regular.woff2" type="font/woff2"/>
        <link rel="preconnect" href="/fonts/ScholastycaTypeface-Regular.woff" type="font/woff" />
        <link rel="preconnect" href="/fonts/ScholastycaTypeface-Regular.ttf" type="font/truetype"/>
        <link rel="preconnect" href="/fonts/ScholastycaTypeface-Regular.svg" type="font/svg"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400&display=swap" rel="stylesheet"/>
      </Helmet>
      <HeaderNavbar name={name} toggleSidebar={toggleSidebar} isOpen={isOpen}/>
      <HeaderMenu menuData={menuData} isOpen={isOpen} toggleSidebar={toggleSidebar} backgroundImageData={backgroundImageData}/>
      
      <BackgroundImage backgroundImageData={backgroundImageData}/>
      {children}
      <Footer socialLinks={menuData.socialLinks} footerLinks={menuData.menuLinks}/>
    </>
  )
}

