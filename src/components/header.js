import React from "react"
import HeaderNavbar from "./headerNavbar"
import HeaderMenu from "./headerMenu"
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
      sanitySeo(_id: {eq: "2b913895-10d9-472b-8d7a-30dd2c56e4ed"}) {
        author
        contact
      }
    }
  `)
    
    const menuData = data.sanityGlobal.menu

    const name = data.sanitySeo.author
    const contact = data.sanitySeo.contact


    return (
        <>
        <HeaderNavbar contact={contact} name={name} toggleSidebar={toggleSidebar} isOpen={isOpen}/>
        <HeaderMenu menuData={menuData} isOpen={isOpen} toggleSidebar={toggleSidebar} />
        </>
    )
  }

