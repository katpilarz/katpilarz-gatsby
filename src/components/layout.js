import React from "react"
import BackgroundImage from "./globalComponents/backgroundImage"
import Footer from "./globalComponents/footer"
import Helmet from "react-helmet";
import PagePreloader from "../components/globalSections/pagePreloader";
import { useStaticQuery, graphql } from "gatsby"


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
      <Helmet>
        <link rel="preconnect" href="/fonts/ScholastycaTypeface-Regular.woff2" type="font/woff2"/>
        <link rel="preconnect" href="/fonts/ScholastycaTypeface-Regular.woff" type="font/woff" />
        <link rel="preconnect" href="/fonts/ScholastycaTypeface-Regular.ttf" type="font/truetype"/>
        <link rel="preconnect" href="/fonts/ScholastycaTypeface-Regular.svg" type="font/svg"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400&display=swap" rel="stylesheet"/>
      </Helmet>
      <PagePreloader/>
      <BackgroundImage backgroundImageData={backgroundImageData}/>
      {children}
      <Footer/>
    </>
  )
}

