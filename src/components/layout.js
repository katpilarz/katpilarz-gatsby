import React from "react"
import BackgroundImage from "./globalComponents/backgroundImage"
import Footer from "./globalComponents/footer"
import PagePreloader from "../components/globalSections/pagePreloader"
import { useStaticQuery, graphql } from "gatsby"

// Outfit is self-hosted now — no render-blocking request to fonts.googleapis.com.
// The local Scholastyca face is declared in styles/imports/_typography.scss and
// preloaded from gatsby-ssr.js.
import "@fontsource-variable/outfit"
import "../styles/layout.scss"

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
    </>
  )
}
