import React, { useState } from "react"
import * as styles from "./header.module.scss";
import useTheme from "../../hooks/useTheme"
import { Link } from "gatsby"
import HeaderMenu from "./headerMenu"
import { useStaticQuery, graphql } from "gatsby"
import Branding from "../globalComponents/branding";



export default function Header({isHome}) {
  const {theme, toggleTheme} = useTheme()

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
    sanityCv(_id: {eq: "cv"}) {
      pdf {
        asset {
          url
        }
      }
    }
   }
  
`)




const [isOpen, setIsOpen] = useState(false)

const toggleSidebar = () => {
  setIsOpen(!isOpen)
}

const author = data.sanitySeo.author
// The CV is a PDF on the CV document, and the "Download CV" link should
// always point at the current one. The link's own URL is whatever was typed
// into the menu when it was made, so any link to a Sanity-hosted PDF is taken
// to be that link and given the file's current URL — uploading a new CV in the
// Studio is then the whole update.
const cvUrl = data.sanityCv?.pdf?.asset?.url
const isSanityPdf = (url) => /^https:\/\/cdn\.sanity\.io\/files\/.+\.pdf$/.test(url || '')
const menuData = cvUrl
  ? {
      ...data.sanityGlobal.menu,
      socialLinks: data.sanityGlobal.menu.socialLinks.map((link) =>
        isSanityPdf(link.url) ? {...link, url: cvUrl} : link
      ),
    }
  : data.sanityGlobal.menu
const backgroundImageData = data.sanityGlobal.image



  return (
    <>
      <nav className={styles.topBar}>
        {/* Left: the two places to go. Right: the two things to operate.
            Mode used to lead the bar, which put a display preference ahead of
            the work itself. */}
        <div className={styles.navGroup}>
            <Link to='/projects'> Work </Link>
            <Link to='#' onClick={(e) => {
                window.location.href = 'mailto:kat.pilarz@proton.me?subject=Project Inquiry&body=Hello Kate, Pls see below my project details:';
                e.preventDefault();
                }}>
                Contact
            </Link>
        </div>
       
        {!isHome && 
          <Branding author={author}/>
        }
        <div className={styles.navGroup}>
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
          <button className={styles.modeToggle}>
            <label>
              <input hidden
                type="checkbox"
                onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
                checked={theme === 'dark'}
              />{' '}
              Mode
            </label>
          </button>
        </div>
      </nav>
      <HeaderMenu menuData={menuData} isOpen={isOpen} toggleSidebar={toggleSidebar} backgroundImageData={backgroundImageData}/>
    </>
  )
}
