const path = require(`path`);
const { postsPerPage } = require(`./src/utils/siteConfig`);
const { paginate } = require(`gatsby-awesome-pagination`);

/**
 * Here is the place where Gatsby creates the URLs for all the
 * posts, tags, and pages that we fetched from the Ghost site.
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allGhostPost(sort: { published_at: ASC }) {
        edges {
          node {
            slug
            primary_tag {
              slug
            }
          }
        }
      }
      allGhostTag(sort: { name: ASC }) {
        edges {
          node {
            slug
            url
            postCount
          }
        }
      }
      allGhostPage(sort: { published_at: ASC }) {
        edges {
          node {
            slug
            url
          }
        }
      }
    }
  `);

  // Check for any errors
  if (result.errors) {
    throw new Error(result.errors);
  }

  // Extract query results
  const tags = result.data.allGhostTag.edges;
  const pages = result.data.allGhostPage.edges;
  const posts = result.data.allGhostPost.edges;

  // Load templates
  const indexTemplate = path.resolve(`./src/templates/index.jsx`);
  const tagsTemplate = path.resolve(`./src/templates/tag.jsx`);
  const pageTemplate = path.resolve(`./src/templates/page.jsx`);
  const postTemplate = path.resolve(`./src/templates/post.jsx`);

  // Create tag pages
  tags.forEach(({ node }) => {
    const totalPosts = node.postCount !== null ? node.postCount : 0;

    // This part here defines, that our tag pages will use
    // a `/tag/:slug/` permalink.
    const url = `${node.slug}/`;

    const items = Array.from({ length: totalPosts });

    // Create pagination
    paginate({
      createPage,
      items,
      itemsPerPage: postsPerPage,
      component: tagsTemplate,
      pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? url : `${url}/page`),
      context: {
        slug: node.slug,
      },
    });
  });

  // Create pages
  pages.forEach(({ node }) => {
    // This part here defines, that our pages will use
    // a `/:slug/` permalink.
    node.url = `/${node.slug}/`;

    createPage({
      path: node.url,
      component: pageTemplate,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.slug,
      },
    });
  });

  // Create post pages
  posts.forEach(({ node }) => {
    // This part here defines, that our posts will use
    // a `/:tag/:slug/` permalink.
    // If a post doesn't have a primary_tag, it will fall back to 'post' as the default tag
    const postTag = node.primary_tag ? node.primary_tag.slug : 'post';
    node.url = `/${postTag}/${node.slug}/`;

    createPage({
      path: node.url,
      component: postTemplate,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.slug,
      },
    });
  });

  // Create pagination
  paginate({
    createPage,
    items: posts,
    itemsPerPage: postsPerPage,
    component: indexTemplate,
    pathPrefix: ({ pageNumber }) => {
      if (pageNumber === 0) {
        return `/`;
      }
      return `/page`;
    },
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: { url: require.resolve('url/') },
    },
  });
};
