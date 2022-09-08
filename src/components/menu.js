import React from "react";
import links from "../data/links"
import { Link } from "gatsby"
import * as styles from "./menu.module.scss";
import cls from "classnames";


const Menu = ({ isOpen,toggleSidebar }) => {

    console.log({ links })
  return (
    <div className={isOpen ? "menu-open" : styles.menu}>
        <div className={isOpen ? styles.menuLinks : null}>
          {links.map(link => {
            return (
              <div className='menu-link' key={link.id}>
                <Link to={link.url} onClick={toggleSidebar}>
                  {link.text}
                </Link>
                <div className={styles.linkImageLeft}>
                    <img class="fit-picture"
                    src="https://images.unsplash.com/photo-1543487945-139a97f387d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
                    alt="Grapefruit slice atop a pile of other slices"/>
                </div>
                <div className={styles.linkImageRight}>
                    <img class="fit-picture"
                    src="https://images.unsplash.com/photo-1543487945-139a97f387d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
                    alt="Grapefruit slice atop a pile of other slices"/>
                </div>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default Menu