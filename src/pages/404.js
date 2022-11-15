import * as React from "react"
import { useState } from 'react';
import PagePreloader from "../components/globalSections/pagePreloader"
import Header from "../components/globalSections/header";
import PageSingle from "../components/page/pageSingle";


// markup
const NotFoundPage = () => {

  const [isHome] = useState(false)
  return (
    <main>
        <PagePreloader/>
        <Header isHome={isHome}/>
        <PageSingle pageName='404' pageTitle='Something went wrong' pageDescription='Please try to do the same action once agan or return to home page. You may consider to contact me and report this error.'/>
      </main>
  )
}

export default NotFoundPage
