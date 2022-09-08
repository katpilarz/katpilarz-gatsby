import React, { useState } from "react"
/*import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import Footer from "./Footer"*/

import "../styles/_layout.scss"
import "../styles/typography.scss"

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
    <h3>Welcome</h3>
    {children}

      {/*<Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      {children}
  <Footer />*/}
    </>
  )
}

export default Layout
