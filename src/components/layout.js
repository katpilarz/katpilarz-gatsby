import React, { useState } from "react"
import Header from "./header"
import BackgroundImage from "./backgroundImage"
import Helmet from "react-helmet";


//import { useStaticQuery, graphql } from "gatsby"

import "../styles/_layout.scss"
import "../styles/typography.scss"


/*
export default function Layout({ children }) {
  const data = useStaticQuery(graphql`
  {
    sanityGlobal {
      image {
        asset {
          gatsbyImageData(layout: FULL_WIDTH, formats: PNG)
        }
        alt
      }
    }
  }
`)

const [isOpen, setIsOpen] = useState(false)

const toggleSidebar = () => {
  setIsOpen(!isOpen)
}

const backgroundImage = data.sanityGlobal.image

  return (
    <>
    
    <Header toggleSidebar={toggleSidebar} isOpen={isOpen}/>
    <Background backgroundImage={ backgroundImage }/>
    {children}
    <p>
      &copy;Copyright {new Date().getFullYear()}. All rights reserved
      <br></br>
      Designed & Developed with love &hearts;
    </p>
    </>
  )
}
*/

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <main>
    <Helmet>
      <link
      href="/fonts/ScholastycaTypeface-Regular.woff2"
      type="font/woff2"
      />
      <link
      href="/fonts/ScholastycaTypeface-Regular.woff"
      type="font/woff"
      />
       <link
      href="/fonts/ScholastycaTypeface-Regular.ttf"
      type="font/truetype"
      />
       <link
      href="/fonts/ScholastycaTypeface-Regular.svg"
      type="font/svg"
      />
    </Helmet>
    
    <Header toggleSidebar={toggleSidebar} isOpen={isOpen}/>
    <BackgroundImage/>
    {children}
    <p>
      &copy;Copyright {new Date().getFullYear()}. All rights reserved
      <br></br>
      Designed & Developed with love &hearts;
    </p>
    </main>
  )
}

export default Layout
