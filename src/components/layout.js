import React from "react"
import BackgroundImage from "./globalComponents/backgroundImage"
import CookieConsent from "./globalComponents/cookieConsent"
import Footer from "./globalComponents/footer"
import PagePreloader from "../components/globalSections/pagePreloader"
import ScrollReset from "./globalComponents/scrollReset"
import { useStaticQuery, graphql } from "gatsby"

export default function Layout({ children, location }) {
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

    }
   }

`)

const backgroundImageData = data.sanityGlobal.image

// The brief page is one screen with nothing below it, so it has no footer.
const hasFooter = location?.pathname?.replace(/\/+$/, '') !== '/brief'


  return (
    <>
      <PagePreloader/>
      <BackgroundImage backgroundImageData={backgroundImageData}/>
      {/* Before the page, so it runs first — see scrollReset.js. */}
      <ScrollReset key={`scroll-reset:${location?.pathname}`}/>
      {children}
      {hasFooter && <Footer/>}
      <CookieConsent/>
    </>
  )
}
