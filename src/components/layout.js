import React, { useState } from "react"
import HeaderNavbar from "./headerNavbar"
import HeaderMenu from "./headerMenu"
import BackgroundImage from "./backgroundImage"
import Footer from "./footer"
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby"
import Btn from "../components/btn";



import "../styles/_layout.scss"
import "../styles/typography.scss"



export default function Layout({ children }) {
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
const contact = data.sanitySeo.contact
const menuData = data.sanityGlobal.menu

  return (
    <>
      <Helmet>
        <link href="/fonts/ScholastycaTypeface-Regular.woff2" type="font/woff2"/>
        <link href="/fonts/ScholastycaTypeface-Regular.woff" type="font/woff" />
        <link href="/fonts/ScholastycaTypeface-Regular.ttf" type="font/truetype"/>
        <link href="/fonts/ScholastycaTypeface-Regular.svg" type="font/svg"/>
      </Helmet>
      <HeaderNavbar contact={contact} name={name} toggleSidebar={toggleSidebar} isOpen={isOpen}/>
      <HeaderMenu menuData={menuData} isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <Btn btnClassName='headerBtn'/>
      <BackgroundImage backgroundImageData={backgroundImageData}/>
      {children}
      <Footer socialLinks={menuData.socialLinks} footerLinks={menuData.menuLinks}/>
    </>
  )
}

