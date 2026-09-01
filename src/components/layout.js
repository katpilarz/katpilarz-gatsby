import React from "react"
import BackgroundImage from "./globalComponents/backgroundImage"
import CookieConsent from "./globalComponents/cookieConsent"
import Footer from "./globalComponents/footer"
import PagePreloader from "../components/globalSections/pagePreloader"
import { useStaticQuery, graphql } from "gatsby"

export default function Layout({ children }) {
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


  return (
    <>
      <PagePreloader/>
      <BackgroundImage backgroundImageData={backgroundImageData}/>
      {children}
      <Footer/>
      <CookieConsent/>
    </>
  )
}
