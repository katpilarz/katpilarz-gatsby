import * as React from "react"
import PagePreloader from "../components/globalSections/pagePreloader"
import { navigate } from 'gatsby';




if (errors) {
  return (
    navigate(`/404`)
  );
}


// markup
const Contact = () => {
  return (
    <main className="container">
      <PagePreloader/>
      <title>Contact</title>
      <h2>Let's collaborate and make something valuable</h2>
    </main>
  )
}

export default Contact