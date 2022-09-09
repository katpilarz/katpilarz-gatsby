import React, { useState } from "react"
import Header from "./header"
import Menu from "./menu"


import "../styles/_layout.scss"
import "../styles/typography.scss"



const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const btnClass = 'btnMenu'

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
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
