import React, { useState } from "react"
import Header from "./header"
import Menu from "./menu"
/*import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import Footer from "./Footer"*/

import "../styles/_layout.scss"
import "../styles/typography.scss"

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
    console.log( 'hi I was clicked' )
  }

  return (
    <>
    
    <Header toggleSidebar={toggleSidebar}/>
    <Menu isOpen={isOpen} toggleSidebar={toggleSidebar} />
    {children}
    </>
  )
}

export default Layout
