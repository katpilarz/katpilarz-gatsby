import React, { useState } from "react"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
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
    <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <div className="themeToggler">
            <label>
              <input hidden
                type="checkbox"
                onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
                checked={theme === 'dark'}
              />{' '}
              Dark / Light Mode
              
            </label>
          </div>
        )}
    </ThemeToggler>
    {children}

      {/*<Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      {children}
  <Footer />*/}
    </>
  )
}

export default Layout
