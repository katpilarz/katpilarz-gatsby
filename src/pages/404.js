import * as React from "react"
import { Link } from "gatsby"
import PagePreloader from "../components/globalSections/pagePreloader"


// markup
const NotFoundPage = () => {
  return (
    <main className="container">
      <PagePreloader/>
      <title>OOpps</title>
      <h2>Somethin went wrong</h2>
      <Link to="/">Go home</Link>.
    </main>
  )
}

export default NotFoundPage
