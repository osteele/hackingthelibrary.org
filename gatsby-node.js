const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);
const moment = require('moment')

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
  let { internal, fileAbsolutePath: absolutePath, frontmatter: fm } = node;

  if (internal.type === `MarkdownRemark` && !fm.path) {
    const relativePath = createFilePath({ node, getNode, basePath: `pages` });
    const collection = relativePath.split('/')[1]
    fm.collection = collection;
    fm.path = collection === 'posts'
      ? replaceSlug(relativePath,
        `${moment(fm.date).format('YYYY/MM/DD')}/${slugify(fm.title)}`)
      : collection === 'handouts'
        ? replaceSlug(relativePath,
          `${moment(fm.date).format('MM-DD')}-${slugify(fm.title)}`)
        : relativePath;
  }
};

const slugify = (s) =>
  s.replace(/[^a-z0-9]/gi, '-').toLowerCase();

const replaceSlug = (path, slug) => {
  let components = path.split('/');
  components[components.length - 2] = slug;
  return components.join('/')
}

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
