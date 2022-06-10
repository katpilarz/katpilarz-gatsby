import * as React from "react"
import { graphql } from "gatsby";


export const query = graphql`
  query HomePageQuery {
    site:allSanitySiteSettings {
      edges {
        node {
          author
          contact
          description
          keywords
          subtitle
          title
        }
      }
    }
  }
    
`;



// markup
const IndexPage = props => {
  const { data, errors } = props;

  const site = (data || {}).site.edges[0].node;


  return (
    <main>
      <title>katgolek</title>
      <span>{site.author}</span>
      <h1>{site.title}</h1>
      <h2>{site.description}</h2>
      <h2>{site.subtitle}</h2>
    </main>
  )
}

export default IndexPage
