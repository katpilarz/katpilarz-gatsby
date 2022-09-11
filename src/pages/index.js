import * as React from "react"
import { graphql } from "gatsby";
import Seo from "../components/seo";
import Banner from "../components/banner";
import { Link } from "gatsby"
import ProjectBanner from "../components/projectBanner";




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
            alt
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

 

  if (errors) {
    return (
      <h1>Something went wrong</h1>
    );
  }

  return (
    <>
    <Seo title={site.title} description={site.description} keywords={site.keywords}  />
    <main>
      
    <Banner name={site.name}/>
    <section>
      {featuredProjects.map((project, index) => {
            return (
              <article key={index}>
                <Link  to={`/projects/${project.node.slug.current}`}>
                  <ProjectBanner project={project.node}/>
                </Link>
              </article>
            )
        })}
      </section>
    </main>
    </>
  )
}

export default IndexPage
