import React from "react";
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import * as styles from "./header.module.scss";


const Header = ({ toggleSidebar }) => {
  return (
    <header className={styles.header}>
      <ThemeToggler>
          {({ theme, toggleTheme }) => (
            <button className={styles.themeToggler}>
              <label>
                <input hidden
                  type="checkbox"
                  onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
                  checked={theme === 'dark'}
                />{' '}
                DARK/LIGHT MODE
              </label>
            </button>
          )}
      </ThemeToggler>
      <div className={styles.branding}>
          <h5>Katarzyna Golek</h5>
      </div>
      <div className={styles.buttonsWrapper}>
        <button type="button">
            katgolek@pm.me
        </button>
        <button type="button" onClick={toggleSidebar}>
            MENU
        </button>
      </div>
      
    </header>
  )
}

export default Header

