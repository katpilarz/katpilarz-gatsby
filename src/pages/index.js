import * as React from "react"
import { graphql } from "gatsby";
import SEO from "../components/seo";
//import "../styles/home.scss"



export const query = graphql`
query HomePageQuery{
    site: sanitySeo(_id: {eq: "2b913895-10d9-472b-8d7a-30dd2c56e4ed"}) {
      title
      description
      keywords
      author
      name
    }
    projects: allSanityProject(
      sort: {order: DESC, fields: publishedAt}
      filter: {isFeatured: {eq: true}}
    ) {
      edges {
        node {
          id
          bannerImage {
            asset {
              gatsbyImageData(formats: WEBP, placeholder: BLURRED, layout: FULL_WIDTH)
              url
            }
          }
          header
          isFeatured
          overview
          publishedAt(formatString: "YYYY")
          title
          slug {
            current
          }
          services {
            title
            slug {
              current
            }
          }
        }
      }
    }

  }
`


/*export const query = graphql`
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
    
`;*/



// markup
const IndexPage = props => {
  const { data, errors } = props;
  const site = (data || {}).site;
  const featuredProjects = (data || {}).projects.edges;

  console.log({ featuredProjects })
  console.log({ site })


  if (errors) {
    return (
      <h1>Something went wrong</h1>
    );
  }

  return (
    <>
    <SEO title={site.title} description={site.description} keywords={site.keywords} />
    <main>
      
    <h1>{site.name}</h1>
      {/*<title>{site.author}</title>
      <span>{site.author}</span>
      <h1>{site.title}</h1>
      <h2>{site.description}</h2>
  <h2>{site.subtitle}</h2>*/}
    <section>
      {featuredProjects.map((project, index) => {
            return (
              <article key={index}>
                <h2>{project.node.title}</h2>
                {project.node.overview}
                  {project.node.publishedAt}
              </article>
            )
        })}
      </section>
    </main>
    </>
  )
}

export default IndexPage
