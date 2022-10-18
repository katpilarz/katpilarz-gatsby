import React from "react";
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import * as styles from "./headerNavbar.module.scss";
import { Link } from "gatsby"




const HeaderNavbar = ({ isOpen, toggleSidebar, name }) => {


  return (
    <nav className={styles.navbar}>
      <ThemeToggler>
          {({ theme, toggleTheme }) => (
            <button className={styles.themeToggler}>
              <label>
                <input hidden
                  type="checkbox"
                  onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
                  checked={theme === 'dark'}
                />{' '}
                Dark/Light Mode
              </label>
            </button>
          )}
      </ThemeToggler>
      <div className={`${styles.branding} link`}>
        <Link to='/'> {name} </Link>
      </div>
      <div className={styles.buttonsWrapper}>
        <Link to='#' onClick={(e) => {
            window.location.href = 'mailto:katgolek@pm.me?subject=Project Inquiry&body=Hello Kate, Pls see below my project details:';
            e.preventDefault();
            }}>
            Contact
        </Link>
        {!isOpen &&
          <button type="button" onClick={toggleSidebar}>
              Menu
          </button>
        }
        {isOpen &&
          <button type="button" onClick={toggleSidebar}>
              Close
          </button>
        }
      </div>
    </nav>
  )
}

export default HeaderNavbar

