import React, { useState } from "react"
import Header from "./header"

import "../styles/_layout.scss"
import "../styles/typography.scss"



const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
    
    <Header toggleSidebar={toggleSidebar} isOpen={isOpen}/>
    {children}
    <p>
      &copy;Copyright {new Date().getFullYear()}. All rights reserved
      <br></br>
      Designed & Developed with love &hearts;
    </p>
    </>
  )
}

export default Layout
