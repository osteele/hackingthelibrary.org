const path = require("path");

exports.createPages = async ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const pageTemplate = path.resolve(`src/templates/pageTemplate.js`);

  const query = graphql(nodeQuery);
  const result = await query
  if (result.errors) {
    console.error(result.errors);
    return Promise.reject(result.errors);
  }

  const prefix = path.join(__dirname, 'src', 'pages')

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    let path = node.frontmatter.path;
    // The following doesn't work, becuase pageTemplate queries on
    // frontmatter.path
    const { fileAbsolutePath: filePath } = node;
    if (!path && filePath.startsWith(prefix)) {
      path = filePath.slice(prefix.length).replace(/\.md$/, '');
    }
    createPage({
      path: path,
      component: pageTemplate,
      context: {}, // additional data can be passed via context
    });
  });
};

const nodeQuery = `
{
  allMarkdownRemark(
    sort: { order: DESC, fields: [] }
    limit: 1000
  ) {
    edges {
      node {
        fileAbsolutePath
        frontmatter {
          path
          google_doc
          embed_doc
        }
      }
    }
  }
}
`
