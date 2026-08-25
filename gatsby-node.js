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

exports.createPages = async ({graphql, actions}) => {
  await createProjectPages(graphql, actions)
  await createServicePages(graphql, actions)
}
