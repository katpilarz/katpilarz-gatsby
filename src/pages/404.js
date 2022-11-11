import * as React from "react"
import PagePreloader from "../components/globalSections/pagePreloader"
import PageSingle from "../components/pageSingle";


// markup
const NotFoundPage = () => {
  return (
    <main>
        <PagePreloader/>
        <PageSingle pageName='404' pageTitle='Something went wrong' pageDescription='Please try to do the same action once agan or return to home page. You may consider to contact me and report this error.'/>
      </main>
  )
}

export default NotFoundPage
