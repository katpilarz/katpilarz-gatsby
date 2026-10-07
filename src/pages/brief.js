import * as React from "react"
import { graphql } from "gatsby";
import Seo from "../components/globalComponents/seo";
import PagePreloader from "../components/globalSections/pagePreloader"
import Header from "../components/globalSections/header";
import BriefSingle from "../components/brief/briefSingle";
import { useEffect, useState } from 'react';



export const query = graphql`
  query BriefPageQuery {
    project: sanityProject(slug: {current: {eq: "qrcodeflip"}}) {
      title
      slug {
        current
      }
      homeFeaturedProjectImage {
        alt
        asset {
          gatsbyImageData(formats: WEBP, layout: FULL_WIDTH, placeholder: BLURRED)
        }
      }
    }
  }
`



// The "Send me a brief" link in the contact section comes here.
const BriefPage = ({ data }) => {

  const [isHome] = useState(false)
  useEffect(() => {
    // Braces matter: see faqs.js.
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      <PagePreloader/>
      <Header isHome={isHome}/>
      <BriefSingle project={data?.project}/>
    </main>
  )
}

export default BriefPage

export const Head = ({location}) => (
  <Seo
    title="Send me a brief"
    description="Tell me about your project: what you're building, who it's for and what it should achieve. One question at a time, sent straight to me."
    overview="Katarzyna Pilarz"
    pathname={location.pathname}
  />
)
