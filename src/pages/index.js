import * as React from "react"
import { graphql } from "gatsby";
import Seo from "../components/seo";
import Btn from "../components/btn";
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
    <Seo title={site.title} description={site.description} keywords={site.keywords} />
    <main>
      
    <h1>{site.name}</h1>
    <h4>Tailoring customized web information 
architecture for small business and start ups</h4>
    <Btn/>

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
