const {isFuture, parseISO} = require('date-fns')

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

async function createProjectPages(graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityProject(filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const projectEdges = (result.data.allSanityProject || {}).edges || []

  projectEdges
    .filter((edge) => !isFuture(parseISO(edge.node.publishedAt)))
    .forEach((edge) => {
      const id = edge.node.id
      const slug = edge.node.slug.current

      createPage({
        path: `/projects/${slug}/`,
        component: require.resolve('./src/templates/project.js'),
        context: {id},
      })
    })
}

async function createServicePages(graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityService(filter: {slug: {current: {ne: null}}}) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const serviceEdges = (result.data.allSanityService || {}).edges || []

  serviceEdges.forEach((edge) => {
    const id = edge.node.id
    const slug = edge.node.slug.current

    createPage({
      path: `/services/${slug}/`,
      component: require.resolve('./src/templates/service.js'),
      context: {id},
    })
  })
}

/**
 * gatsby-source-sanity builds its types from the *deployed* GraphQL API, not
 * from the Studio schema, so a field added in the Studio does not exist here
 * until someone runs `sanity graphql deploy` — and a query that asks for it
 * fails the build. The plugin keeps every raw document field on the node,
 * though, so declaring the field is all it takes to read it. Declaring it here
 * means the build no longer depends on remembering that deploy, and it merges
 * cleanly with the deployed type once that does happen.
 *
 * The case study sections reuse the plugin's own SanityFigure, so a section's
 * images resolve and get gatsbyImageData exactly like a banner image does. The
 * body is plain portable text, read as JSON — the shape `_raw` fields give.
 *
 * The home page testimonial is plain text: a quote, who said it, and a link to
 * where it can be read in full.
 */
exports.createSchemaCustomization = ({actions}) => {
  actions.createTypes(`
    type SanityProject implements Node {
      figmaUrl: String
      summary: String
      caseStudy: [SanityCaseSection]
    }

    type SanityHome implements Node {
      testimonial: SanityHomeTestimonial
    }

    type SanityHomeTestimonial {
      quote: String
      name: String
      role: String
      link: String
      linkText: String
    }

    type SanityCaseSection {
      _key: String
      heading: String
      lead: String
      body: JSON
      figures: [SanityFigure]
      figureLayout: String
    }
  `)
}

exports.createPages = async ({graphql, actions}) => {
  await createProjectPages(graphql, actions)
  await createServicePages(graphql, actions)
}

/**
 * CSS Modules compile to scoped, hashed class names, so the order in which
 * two module stylesheets land in a chunk cannot change the cascade.
 * mini-css-extract-plugin warns about it anyway; `ignoreOrder` is the
 * supported way to turn that off.
 *
 * The genuinely order-sensitive files — layout.scss and the Outfit stylesheet
 * — are global CSS and are imported from gatsby-browser.js, which pins them
 * ahead of every module stylesheet.
 */
exports.onCreateWebpackConfig = ({stage, actions, getConfig}) => {
  if (stage !== 'develop' && stage !== 'build-javascript') return

  const config = getConfig()
  const miniCssExtract = config.plugins.find(
    (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
  )

  if (miniCssExtract) {
    miniCssExtract.options.ignoreOrder = true
    actions.replaceWebpackConfig(config)
  }
}
