import React from "react"
import MenuNavbar from "./menuNavbar"
import Menu from "./menu"
import { useStaticQuery, graphql } from "gatsby"


import "../styles/_layout.scss"
import "../styles/typography.scss"




export default function Header({ isOpen, toggleSidebar }) {
    const data = useStaticQuery(graphql`
      {
      sanityGlobal {
        menu {
          defaultImage {
            alt
            asset {
              gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: BLURRED)
              url
            }
          }
          menuLinks {
            text
            url
            image {
              alt
              asset {
                gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: BLURRED)
              }
            }
          }
          socialLinks {
            text
            url
          }
        }
      }
    }
  `)
    
    const menuData = data.sanityGlobal.menu

    console.log({menuData})
    return (
        <>
        <MenuNavbar toggleSidebar={toggleSidebar} isOpen={isOpen}/>
        <Menu menuData={menuData} isOpen={isOpen} toggleSidebar={toggleSidebar} />
        </>
    )
  }

