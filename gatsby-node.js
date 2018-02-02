const path = require("path");

exports.createPages = async ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  const pageTemplate = path.resolve(`src/templates/pageTemplate.js`);
  const query = graphql(nodeQuery);
  const result = await query;

  if (result.errors) {
    console.error(result.errors);
    return Promise.reject(result.errors);
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    let path = node.frontmatter.path;
    createPage({
      path: path,
      component: pageTemplate,
      context: {}, // additional data can be passed via context
    });
  });
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
  let { internal, fileAbsolutePath: filePath, frontmatter: fm } = node;

  if (internal.type === `MarkdownRemark` && !fm.path) {
    const prefix = path.join(__dirname, 'src', 'pages')
    fm.path = filePath.slice(prefix.length).replace(/\.md$/, '');
  }
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
          author
          description
          google_doc
          embed_doc
          thumbnail { path source source_url }
        }
      }
    }
  }
}
`
